import Dimension from './Dimension';
import Position from './Position';
import Vaisseau from './Vaisseau';
import HorsEspaceJeuException from './utils/HorsEspaceJeuException';
import DebordementEspaceJeuException from './utils/DebordementEspaceJeuException';
import Missile from './Missile';
import MissileException from './utils/MissileException';
import Direction from './Direction';

export default class SpaceInvaders {
  private static readonly MARQUE_FIN_LIGNE: string = '\n';
  private static readonly MARQUE_VIDE: string = '.';
  private static readonly MARQUE_VAISSEAU: string = 'V';
  private static readonly MARQUE_MISSILE: string = 'M';

  private longueur: number;
  private hauteur: number;
  private vaisseau?: Vaisseau;
  private missile?: Missile;

  public constructor(longueur: number, hauteur: number) {
    this.longueur = longueur;
    this.hauteur = hauteur;
  }

  public recupererEspaceJeuDansChaineASCII(): string {
    let espaceDeJeu: string = '';
    for (let y: number = 0; y < this.hauteur; y++) {
      for (let x: number = 0; x < this.longueur; x++) {
        espaceDeJeu += this.recupererMarqueDeLaPosition(x, y);
      }
      espaceDeJeu += SpaceInvaders.MARQUE_FIN_LIGNE;
    }
    return espaceDeJeu;
  }

  private recupererMarqueDeLaPosition(x: number, y: number): string {
    if (this.aUnVaisseauQuiOccupeLaPosition(x, y)) {
      return SpaceInvaders.MARQUE_VAISSEAU;
    }
    if (this.aUnMissileQuiOccupeLaPosition(x, y)) {
      return SpaceInvaders.MARQUE_MISSILE;
    }
    return SpaceInvaders.MARQUE_VIDE;
  }

  aUnMissileQuiOccupeLaPosition(x: number, y: number): boolean {
    return !!this.missile && this.missile.occupeLaPosition(x, y);
  }

  private aUnVaisseauQuiOccupeLaPosition(x: number, y: number): boolean {
    return !!this.vaisseau && this.vaisseau.occupeLaPosition(x, y);
  }

  public positionnerUnNouveauVaisseau(dimension: Dimension, position: Position, vitesse: number = 1): void {
    let x: number = position.abscisse();
    let y: number = position.ordonnee();
    let longueurVaisseau: number = dimension.getLongueur();
    let hauteurVaisseau: number = dimension.getHauteur();

    if (!this.estDansEspaceJeu(x, y)) {
      throw new HorsEspaceJeuException("La position du vaisseau est en dehors de l'espace jeu");
    }

    if (!this.estDansEspaceJeu(x + longueurVaisseau - 1, y)) {
      throw new DebordementEspaceJeuException("Le vaisseau déborde de l'espace jeu vers la droite à cause de sa longueur");
    }
    if (!this.estDansEspaceJeu(x, y - hauteurVaisseau + 1)) {
      throw new DebordementEspaceJeuException("Le vaisseau déborde de l'espace jeu vers le bas à cause de sa hauteur");
    }
    this.vaisseau = new Vaisseau(dimension, position, vitesse);
  }

  private estDansEspaceJeu(x: number, y: number): boolean {
    return (x >= 0 && x < this.longueur && y >= 0 && y < this.hauteur);
  }

  public deplacerVaisseauVersLaDroite(): void {
    if (this.vaisseau && this.vaisseau.abscisseLaPlusADroite() < this.longueur - 1) {
      this.vaisseau.seDeplacerVersLaDroite();
      if (!this.estDansEspaceJeu(this.vaisseau.abscisseLaPlusADroite(), this.vaisseau.ordonneeLaPlusHaute())) {
        this.vaisseau.positionner(this.longueur - this.vaisseau.longueur(), this.vaisseau.ordonneeLaPlusHaute());
      }
    }
  }

  public deplacerVaisseauVersLaGauche(): void {
    if (this.vaisseau && this.vaisseau.abscisseLaPlusAGauche() > 0) {
      this.vaisseau.seDeplacerVersLaGauche();
      if (!this.estDansEspaceJeu(this.vaisseau.abscisseLaPlusAGauche(), this.vaisseau.ordonneeLaPlusHaute())) {
        this.vaisseau.positionner(0, this.vaisseau.ordonneeLaPlusHaute());
      }
    }
  }

  public tirerUnMissile(dimension: Dimension, vitesse: number) {
    if (this.vaisseau) {
      if (this.vaisseau.hauteur() + dimension.getHauteur() > this.hauteur) {
        throw new MissileException("Pas assez de hauteur libre entre le vaisseau et le haut de l'espace jeu pour tirer le missile");
      }
      this.missile = this.vaisseau.tirerUnMissile(dimension, vitesse);
    } else {
      throw new Error("Vaisseau is not defined");
    }
  }

  aUnMissile(): boolean {
    return this.missile instanceof Missile;
  }

  deplacerMissile(): void {
    if (this.missile) {
      this.missile.deplacerVerticalementVers(Direction.HAUT_ECRAN);
      if (this.missile.ordonneeLaPlusBasse() <= 0) {
        delete this.missile;
      }
    }
  }
}