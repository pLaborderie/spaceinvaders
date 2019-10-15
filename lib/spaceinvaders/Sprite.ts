import Position from "./Position";
import Dimension from "./Dimension";
import Direction from "./Direction";

interface ISprite {
  origine: Position;
  dimension: Dimension;
  vitesse: number;
}

export default abstract class Sprite {
  private origine: Position;
  private dimension: Dimension;
  private vitesse: number;

  public constructor(dimension: Dimension, origine: Position, vitesse: number) {
    this.dimension = dimension
    this.origine = origine;
    this.vitesse = vitesse;
  }

  public longueur(): number {
    return this.dimension.getLongueur();
  }

  public hauteur(): number {
    return this.dimension.getHauteur();
  }

  public abscisseLaPlusAGauche(): number {
    return this.origine.abscisse();
  }

  public abscisseLaPlusADroite(): number {
    return this.abscisseLaPlusAGauche() + this.dimension.getLongueur() - 1;
  }

  public ordonneeLaPlusHaute(): number {
    return this.origine.ordonnee();
  }

  public ordonneeLaPlusBasse(): number {
    return this.ordonneeLaPlusHaute() - this.dimension.getHauteur() + 1;
  }

  public occupeLaPosition(x: number, y: number): boolean {
    return (this.estAbscisseCouverte(x) && this.estOrdonneeCouverte(y));
  }

  private estAbscisseCouverte(x: number) {
    return this.abscisseLaPlusAGauche() <= x && x <= this.abscisseLaPlusADroite();
  }

  private estOrdonneeCouverte(y: number): boolean {
    return this.ordonneeLaPlusBasse() <= y && y <= this.ordonneeLaPlusHaute();
  }

  public seDeplacerVersLaDroite(): void {
    this.deplacerHorizontalementVers(Direction.DROITE);
  }

  public seDeplacerVersLaGauche(): void {
    this.deplacerHorizontalementVers(Direction.GAUCHE);
  }

  public deplacerVersLeHaut(): void {
    this.deplacerVerticalementVers(Direction.HAUT);
  }

  public deplacerVerticalementVers(direction: Direction): void {
    this.origine.changerOrdonnee(this.origine.ordonnee() + direction.getValeur() * this.vitesse);
  }

  public deplacerHorizontalementVers(direction: Direction) {
      this.origine.changerAbscisse(this.origine.abscisse() + direction.getValeur() * this.vitesse);
  }

  public positionner(x: number, y: number): void {
    this.origine.changerAbscisse(x);
    this.origine.changerOrdonnee(y);
  }

}