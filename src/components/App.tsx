import * as React from "react";
import { useState, useEffect } from "react";
import SpaceInvaders from "../../lib/spaceinvaders/SpaceInvaders";
import Dimension from "../../lib/spaceinvaders/Dimension";
import Position from "../../lib/spaceinvaders/Position";

export interface IAppProps {
  width?: number,
  height?: number,
}

let spaceinvaders: SpaceInvaders;

const SPACE = 32;
const LEFT_ARROW = 37;
const RIGHT_ARROW = 39;

export default function App(props: IAppProps) {
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
    spaceinvaders.deplacerMissile();
    updateGame();
  }

  function initGame(): void {
    spaceinvaders = new SpaceInvaders(props.width || 15, props.height || 10);
    spaceinvaders.positionnerUnNouveauVaisseau(new Dimension(3, 2), new Position(7, 9));
    updateGame();
  }

  function moveLeft(): void {
    spaceinvaders.deplacerVaisseauVersLaGauche();
    updateGame();
  }

  function moveRight(): void {
    spaceinvaders.deplacerVaisseauVersLaDroite();
    updateGame();
  }

  function fireMissile(): void {
    if (!spaceinvaders.aUnMissile()) {
      spaceinvaders.tirerUnMissile(new Dimension(1, 2), 2);
      updateGame();
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