import Position from "./Position";
import Dimension from "./Dimension";
import Sprite from "./Sprite";

interface IVaisseau {
  origine: Position;
  dimension: Dimension;
  vitesse: number;
}

export default class Vaisseau extends Sprite {
  public constructor(dimension: Dimension, origine: Position, vitesse: number = 1) {
    super(dimension, origine, vitesse);
  }

}