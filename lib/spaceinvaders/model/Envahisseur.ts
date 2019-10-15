import Sprite from "./Sprite";
import Dimension from "./Dimension";
import Position from "./Position";
import Direction from "./Direction";

export default class Envahisseur extends Sprite {
  private direction: Direction;

  public constructor(dimension: Dimension, origine: Position, vitesse: number = 1) {
    super(dimension, origine, vitesse);
    this.direction = Direction.DROITE;
  }

  public deplacerHorizontalement(): void {
    this.deplacerHorizontalementVers(this.direction);
  }

  public getDirection(): Direction {
    return this.direction;
  }

  public changerDirection(direction: Direction): void {
    this.direction = direction;
  }
}