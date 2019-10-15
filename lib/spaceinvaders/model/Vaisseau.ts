import Position from "./Position";
import Dimension from "./Dimension";
import Sprite from "./Sprite";
import Missile from "./Missile";
import MissileException from "../utils/MissileException";

export default class Vaisseau extends Sprite {
  public constructor(dimension: Dimension, origine: Position, vitesse: number = 1) {
    super(dimension, origine, vitesse);
  }

  public tirerUnMissile(dimensionMissile: Dimension, vitesseMissile: number): Missile {
    if (dimensionMissile.getLongueur() > this.longueur()) {
      throw new MissileException("La longueur du missile est supérieure à celle du vaisseau");
    }
    const positionOrigineMissile: Position = this.calculerLaPositionDeTirDuMissile(dimensionMissile);
    return new Missile(dimensionMissile, positionOrigineMissile, vitesseMissile);
  }

  private calculerLaPositionDeTirDuMissile(dimension: Dimension): Position {
    const abscisseMilieuVaisseau: number = Math.floor(this.abscisseLaPlusAGauche() + (this.longueur() / 2));
    const abscisseOrigineMissile: number = Math.floor(abscisseMilieuVaisseau - (dimension.getLongueur() / 2));
    const ordonneeOrigineMissile: number = this.ordonneeLaPlusBasse() - 1;
    return new Position(abscisseOrigineMissile, ordonneeOrigineMissile);
  }
}