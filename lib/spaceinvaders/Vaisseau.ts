import Position from "./Position";
import Dimension from "./Dimension";

interface IVaisseau {
  origine: Position;
  dimension: Dimension;
  vitesse: number;
}

export default class Vaisseau {
  private origine: Position;
  private dimension: Dimension;
  private vitesse: number;

  public constructor(longueur: number, hauteur: number, x?: number, y?: number);
  public constructor(dimension: Dimension, origine: Position, vitesse?: number);
  public constructor(
    a1: number | Dimension,
    a2: number | Position,
    a3?: number,
    a4?: number,
  ) {
    let { dimension, origine, vitesse } = this.formatConstructorParams(a1, a2, a3, a4);
    this.dimension = dimension
    this.origine = origine;
    this.vitesse = vitesse;
  }

  private formatConstructorParams(a1: number | Dimension, a2: number | Position, a3: number | undefined, a4: number | undefined) {
    if (typeof a1 === "number" && typeof a2 === "number") {
      return this.numbersConstructor(a1, a2, a3, a4);
    }
    else if (a1 instanceof Dimension && a2 instanceof Position) {
      return this.classesConstructor(a1, a2, a3);
    }
    else {
      throw new Error("Incorrect params");
    }
  }

  private numbersConstructor(longueur: number, hauteur: number, x: number = 0, y: number = 0): IVaisseau {
    return {
      dimension: new Dimension(longueur, hauteur),
      origine: new Position(x, y),
      vitesse: 1,
    };
  }

  private classesConstructor(dimension: Dimension, position: Position, vitesse: number = 1): IVaisseau {
    return {
      dimension,
      origine: position,
      vitesse,
    };
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