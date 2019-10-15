import * as React from "react";
import { useState, useEffect } from "react";
import SpaceInvaders from "../../lib/spaceinvaders/model/SpaceInvaders";
import Dimension from "../../lib/spaceinvaders/model/Dimension";
import Constante from "../../lib/spaceinvaders/utils/Constante";

let spaceinvaders: SpaceInvaders;

const SPACE = 32;
const LEFT_ARROW = 37;
const RIGHT_ARROW = 39;

export default function App() {
  const [game, setGame]: [string, any] = useState("");

  useEffect(() => {
    initGame();
    document.addEventListener("keydown", keyDownListener);
    setInterval(() => {
      tick();
    }, 500);
  }, []);

  function updateGame() {
    if (spaceinvaders) {
      setGame(spaceinvaders.recupererEspaceJeuDansChaineASCII());
    }
  }

  function tick(): void {
    spaceinvaders.evoluer();
    updateGame();
  }

  function initGame(): void {
    spaceinvaders = new SpaceInvaders(Constante.ESPACEJEU_LONGUEUR, Constante.ESPACEJEU_HAUTEUR);
    spaceinvaders.initialiserJeu();
    updateGame();
  }

  function moveLeft(): void {
    spaceinvaders.deplacerVaisseauVersLaGauche();
  }

  function moveRight(): void {
    spaceinvaders.deplacerVaisseauVersLaDroite();
  }

  function fireMissile(): void {
    if (!spaceinvaders.aUnMissile()) {
      spaceinvaders.tirerUnMissile(new Dimension(Constante.MISSILE_LONGUEUR, Constante.MISSILE_HAUTEUR), Constante.MISSILE_VITESSE);
    }
  }

  function keyDownListener(e: KeyboardEvent): void {
    switch (e.keyCode) {
      case SPACE:
        fireMissile();
        break;
      case LEFT_ARROW:
        moveLeft();
        break;
      case RIGHT_ARROW:
        moveRight();
        break;
    }
    updateGame();
  }

  return (
    <div>
      <h1>Space Invaders</h1>
      <pre>
        {game}
      </pre>
    </div>
  );
}