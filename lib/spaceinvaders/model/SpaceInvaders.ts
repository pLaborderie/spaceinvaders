import Dimension from './Dimension';
import Position from './Position';
import Vaisseau from './Vaisseau';
import HorsEspaceJeuException from '../utils/HorsEspaceJeuException';
import DebordementEspaceJeuException from '../utils/DebordementEspaceJeuException';
import Missile from './Missile';
import MissileException from '../utils/MissileException';
import Constante from '../utils/Constante';
import Direction from './Direction';
import Envahisseur from './Envahisseur';
import Jeu from './Jeu';

export default class SpaceInvaders implements Jeu {

  private longueur: number;
  private hauteur: number;
  private vaisseau?: Vaisseau;
  private missile?: Missile;
  private envahisseur?: Envahisseur;

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
      espaceDeJeu += Constante.MARQUE_FIN_LIGNE;
    }
    return espaceDeJeu;
  }

  public recupererEspaceJeuDansChaineEmojis(): string {
    let espaceDeJeu: string = '';
    for (let y: number = 0; y < this.hauteur; y++) {
      for (let x: number = 0; x < this.longueur; x++) {
        espaceDeJeu += this.recupererEmojiDeLaPosition(x, y);
      }
      espaceDeJeu += Constante.MARQUE_FIN_LIGNE;
    }
    return espaceDeJeu;
  }

  private recupererMarqueDeLaPosition(x: number, y: number): string {
    if (this.aUnVaisseauQuiOccupeLaPosition(x, y)) {
      return Constante.MARQUE_VAISSEAU;
    }
    if (this.aUnMissileQuiOccupeLaPosition(x, y)) {
      return Constante.MARQUE_MISSILE;
    }
    if (this.aUnEnvahisseurQuiOccupeLaPosition(x, y)) {
      return Constante.MARQUE_ENVAHISSEUR;
    }
    return Constante.MARQUE_VIDE;
  }

  private recupererEmojiDeLaPosition(x: number, y: number): string {
    if (this.aUnVaisseauQuiOccupeLaPosition(x, y)) {
      return Constante.EMOJI_VAISSEAU;
    }
    if (this.aUnMissileQuiOccupeLaPosition(x, y)) {
      return Constante.EMOJI_MISSILE;
    }
    if (this.aUnEnvahisseurQuiOccupeLaPosition(x, y)) {
      return Constante.EMOJI_ENVAHISSEUR;
    }
    return Constante.EMOJI_VIDE;
  }

  aUnEnvahisseurQuiOccupeLaPosition(x: number, y: number): boolean {
    return !!this.envahisseur && this.envahisseur.occupeLaPosition(x, y);
  }

  aUnMissileQuiOccupeLaPosition(x: number, y: number): boolean {
    return !!this.missile && this.missile.occupeLaPosition(x, y);
  }

  private aUnVaisseauQuiOccupeLaPosition(x: number, y: number): boolean {
    return !!this.vaisseau && this.vaisseau.occupeLaPosition(x, y);
  }

  public positionnerUnNouveauVaisseau(dimension: Dimension, position: Position, vitesse: number = 1): void {
    this.gestionErreursPositionNouvelElement(position, dimension);
    this.vaisseau = new Vaisseau(dimension, position, vitesse);
  }

  public positionnerUnNouvelEnvahisseur(dimension: Dimension, position: Position, vitesse: number = 1): void {
    this.gestionErreursPositionNouvelElement(position, dimension);
    this.envahisseur = new Envahisseur(dimension, position, vitesse);
  }

  private gestionErreursPositionNouvelElement(position: Position, dimension: Dimension) {
    let x: number = position.abscisse();
    let y: number = position.ordonnee();
    let longueurElement: number = dimension.getLongueur();
    let hauteurElement: number = dimension.getHauteur();
    if (!this.estDansEspaceJeu(x, y)) {
      throw new HorsEspaceJeuException("La position de l'élément est en dehors de l'espace jeu");
    }
    if (!this.estDansEspaceJeu(x + longueurElement - 1, y)) {
      throw new DebordementEspaceJeuException("L'élément déborde de l'espace jeu vers la droite à cause de sa longueur");
    }
    if (!this.estDansEspaceJeu(x, y - hauteurElement + 1)) {
      throw new DebordementEspaceJeuException("L'élément déborde de l'espace jeu vers le bas à cause de sa hauteur");
    }
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

  deplacerEnvahisseur(): void {
    if (this.envahisseur) {
      if (this.envahisseurToucheLimite()) {
        this.inverserDirectionEnvahisseur();
      }
      this.envahisseur.deplacerHorizontalement();
    }
  }

  private inverserDirectionEnvahisseur(): void {
    if (this.envahisseur) {
      if (this.envahisseur.getDirection() === Direction.DROITE) {
        this.envahisseur.changerDirection(Direction.GAUCHE);
      } else {
        this.envahisseur.changerDirection(Direction.DROITE);
      }
    }
  }

  private envahisseurToucheLimite(): boolean {
    if (!this.envahisseur) {
      return false;
    }
    const toucheADroite = this.envahisseur.getDirection() === Direction.DROITE && this.envahisseurToucheLimiteADroite();
    const toucheAGauche = this.envahisseur.getDirection() === Direction.GAUCHE && this.envahisseurToucheLimiteAGauche();
    return toucheADroite || toucheAGauche;
  }

  private envahisseurToucheLimiteADroite(): boolean {
    if (!this.envahisseur) {
      return false;
    }
    return this.envahisseur.abscisseLaPlusADroite() === (this.longueur - 1);
  }

  private envahisseurToucheLimiteAGauche(): boolean {
    if (!this.envahisseur) {
      return false;
    }
    return this.envahisseur.abscisseLaPlusAGauche() === 0;
  }

  public evoluer(): void {
    this.deplacerMissile();
    this.deplacerEnvahisseur();
  }

  public initialiserJeu(): void {
    const positionVaisseau: Position = new Position(this.longueur / 2, this.hauteur - 1);
    const dimensionVaisseau: Dimension = new Dimension(Constante.VAISSEAU_LONGUEUR, Constante.VAISSEAU_HAUTEUR);

    const positionEnvahisseur: Position = new Position(this.longueur / 2, Constante.ENVAHISSEUR_HAUTEUR - 1);
    const dimensionEnvahisseur: Dimension = new Dimension(Constante.ENVAHISSEUR_LONGUEUR, Constante.ENVAHISSEUR_HAUTEUR);

    this.positionnerUnNouveauVaisseau(dimensionVaisseau, positionVaisseau);
    this.positionnerUnNouvelEnvahisseur(dimensionEnvahisseur, positionEnvahisseur);
  }

  public etreFini(): boolean {
    return false;
  }
}