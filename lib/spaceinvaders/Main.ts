import SpaceInvaders from './model/SpaceInvaders';
import Constante from './utils/Constante';

export default class Main {
  public main(): void {
    const jeu: SpaceInvaders = new SpaceInvaders(Constante.ESPACEJEU_LONGUEUR, Constante.ESPACEJEU_HAUTEUR);
    jeu.initialiserJeu();
  }
}