import Position from "./Position";
import Dimension from "./Dimension";
import Sprite from "./Sprite";

interface IVaisseau {
  origine: Position;
  dimension: Dimension;
  vitesse: number;
}

export default class Vaisseau extends Sprite {
  public constructor(longueur: number, hauteur: number, x?: number, y?: number);
  public constructor(dimension: Dimension, origine: Position, vitesse?: number);
  public constructor(
    a1: number | Dimension,
    a2: number | Position,
    a3?: number,
    a4?: number,
  ) {
    super(a1, a2, a3, a4);
  }

}