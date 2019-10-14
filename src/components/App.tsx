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

export default function App(props: IAppProps) {
  const [game, setGame]: [string, any] = useState("");

  useEffect(() => {
    initGame();
    document.addEventListener("keydown", keyDownListener);
  }, []);

  function updateGame() {
    if (spaceinvaders) {
      setGame(spaceinvaders.recupererEspaceJeuDansChaineASCII());
    }
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

  function keyDownListener(e: KeyboardEvent): void {
    switch (e.keyCode) {
      case 37:
        moveLeft();
        break;
      case 39:
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