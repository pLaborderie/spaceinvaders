import Dimension from './Dimension';
import Position from './Position';
import Vaisseau from './Vaisseau';
import HorsEspaceJeuException from './utils/HorsEspaceJeuException';
import DebordementEspaceJeuException from './utils/DebordementEspaceJeuException';

export default class SpaceInvaders {
  private static readonly MARQUE_FIN_LIGNE: string = '\n';
  private static readonly MARQUE_VIDE: string = '.';
  private static readonly MARQUE_VAISSEAU: string = 'V';

  private longueur: number;
  private hauteur: number;
  private vaisseau?: Vaisseau;

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
    return SpaceInvaders.MARQUE_VIDE;
  }

  private aUnVaisseauQuiOccupeLaPosition(x: number, y: number): boolean {
    return !!this.vaisseau && this.vaisseau.occupeLaPosition(x, y);
  }

  public positionnerUnNouveauVaisseau(x: number, y: number): void;
  public positionnerUnNouveauVaisseau(dimension: Dimension, position: Position): void;
  public positionnerUnNouveauVaisseau(a1: Dimension | number, a2: Position | number): void {
    let x: number;
    let y: number;
    let longueurVaisseau: number;
    let hauteurVaisseau: number;
    if (typeof a1 === "number" && typeof a2 === "number") {
      x = a1;
      y = a2;
      longueurVaisseau = 1;
      hauteurVaisseau = 1;
    } else if (a1 instanceof Dimension && a2 instanceof Position) {
      x = a2.abscisse();
      y = a2.ordonnee();
      longueurVaisseau = a1.getLongueur();
      hauteurVaisseau = a1.getHauteur();
    } else {
      throw new Error("Arguments invalid");
    }

    if (!this.estDansEspaceJeu(x, y)) {
      throw new HorsEspaceJeuException("La position du vaisseau est en dehors de l'espace jeu");
    }

    if (!this.estDansEspaceJeu(x + longueurVaisseau - 1, y)) {
      throw new DebordementEspaceJeuException("Le vaisseau déborde de l'espace jeu vers la droite à cause de sa longueur");
    }
    if (!this.estDansEspaceJeu(x, y - hauteurVaisseau + 1)) {
      throw new DebordementEspaceJeuException("Le vaisseau déborde de l'espace jeu vers le bas à cause de sa hauteur");
    }
    this.vaisseau = new Vaisseau(longueurVaisseau, hauteurVaisseau);
    this.vaisseau.positionner(x, y);
  }

  private estDansEspaceJeu(x: number, y: number): boolean {
    return (x >= 0 && x < this.longueur && y >= 0 && y < this.hauteur);
  }

  public deplacerVaisseauVersLaDroite(): void {
    if (this.vaisseau && this.vaisseau.abscisseLaPlusADroite() < this.longueur - 1) {
      this.vaisseau.seDeplacerVersLaDroite();
    }
  }

  public deplacerVaisseauVersLaGauche(): void {
    if (this.vaisseau && this.vaisseau.abscisseLaPlusAGauche() > 0) {
      this.vaisseau.seDeplacerVersLaGauche();
    }
  }
}