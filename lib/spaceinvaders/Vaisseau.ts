import Position from "./Position";
import Dimension from "./Dimension";

export default class Vaisseau {
  private origine: Position;
  private dimension: Dimension;

  public constructor(longueur: number, hauteur: number, x?: number, y?: number);
  public constructor(origine: Position, dimension: Dimension);
  public constructor(
    a1: number | Position,
    a2: number | Dimension,
    a3?: number,
    a4?: number,
  ) {
    let origine;
    let dimension;
    if (typeof a1 === "number" && typeof a2 === "number") {
      dimension = new Dimension(a1, a2);
      if (typeof a3 === "number" && typeof a4 === "number") {
        origine = new Position(a3, a4);
      } else {
        origine = new Position(0, 0);
      }
    } else if (a1 instanceof Position && a2 instanceof Dimension) {
      origine = a1;
      dimension = a2;
    } else {
      throw new Error("Invalid arguments");
    }
    this.origine = origine;
    this.dimension = dimension;
  }

  public abscisseLaPlusAGauche(): number {
    return this.origine.abscisse();
  }

  public abscisseLaPlusADroite(): number {
    return this.abscisseLaPlusAGauche() + this.dimension.getLongueur() - 1;
  }

  private ordonneeLaPlusHaute(): number {
    return this.origine.ordonnee();
  }

  private ordonneeLaPlusBasse(): number {
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
    this.origine.changerAbscisse(this.origine.abscisse() + 1);
  }

  public seDeplacerVersLaGauche(): void {
    this.origine.changerAbscisse(this.origine.abscisse() - 1);
  }

  public positionner(x: number, y: number): void {
    this.origine.changerAbscisse(x);
    this.origine.changerOrdonnee(y);
  }

}