export default class Dimension {
  private longueur: number;
  private hauteur: number;

  public constructor(longueur: number, hauteur: number) {
    this.hauteur = hauteur;
    this.longueur = longueur;
  }

  public getLongueur(): number {
    return this.longueur;
  }

  public getHauteur(): number {
    return this.hauteur;
  }
}