import Sprite from "./Sprite";
import Dimension from "./Dimension";
import Position from "./Position";

export default class Missile extends Sprite {
    public constructor(dimension: Dimension, origine: Position, vitesse: number) {
        super(dimension, origine, vitesse);
    }
}