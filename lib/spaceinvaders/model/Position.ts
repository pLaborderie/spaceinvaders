export default class Position {
  private x: number;
  private y: number;

  public constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  public abscisse(): number {
    return this.x;
  }

  public ordonnee(): number {
    return this.y;
  }

  public changerAbscisse(nouvelleAbscisse: number) {
    this.x = nouvelleAbscisse;
  }

  public changerOrdonnee(nouvelleOrdonnee: number) {
    this.y = nouvelleOrdonnee;
  }
}