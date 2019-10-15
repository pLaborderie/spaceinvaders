import Position from "./Position";
import Dimension from "./Dimension";

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
    this.origine.changerAbscisse(this.origine.abscisse() + this.vitesse);
  }

  public seDeplacerVersLaGauche(): void {
    this.origine.changerAbscisse(this.origine.abscisse() - this.vitesse);
  }

  public positionner(x: number, y: number): void {
    this.origine.changerAbscisse(x);
    this.origine.changerOrdonnee(y);
  }

}