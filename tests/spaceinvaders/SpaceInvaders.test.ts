import { expect } from "chai";
import "mocha";

import SpaceInvaders from "../../lib/spaceinvaders/SpaceInvaders";
import Dimension from "../../lib/spaceinvaders/Dimension";
import Position from "../../lib/spaceinvaders/Position";
import { AssertionError } from "assert";
import HorsEspaceJeuException from "../../lib/spaceinvaders/utils/HorsEspaceJeuException";
import DebordementEspaceJeuException from "../../lib/spaceinvaders/utils/DebordementEspaceJeuException";

describe('Testing SpaceInvaders class', function () {
  let spaceInvaders: SpaceInvaders;

  before(() => {
    spaceInvaders = new SpaceInvaders(15, 10);
  });

  it('should be empty at beginning', function () {
    expect("" +
      "...............\n" +
      "...............\n" +
      "...............\n" +
      "...............\n" +
      "...............\n" +
      "...............\n" +
      "...............\n" +
      "...............\n" +
      "...............\n" +
      "...............\n")
      .to.be.equal(spaceInvaders.recupererEspaceJeuDansChaineASCII());
  });

  it('should be correctly positioned', function () {
    spaceInvaders.positionnerUnNouveauVaisseau(new Dimension(1, 1), new Position(7, 9));
    expect("" +
      "...............\n" +
      "...............\n" +
      "...............\n" +
      "...............\n" +
      "...............\n" +
      "...............\n" +
      "...............\n" +
      "...............\n" +
      "...............\n" +
      ".......V.......\n")
      .to.be.equal(spaceInvaders.recupererEspaceJeuDansChaineASCII());
  });

  it('should throw HorsEspaceJeuException', function () {
    try {
      spaceInvaders.positionnerUnNouveauVaisseau(new Dimension(1, 1), new Position(15, 9));
      expect.fail("Position trop à droite: devrait déclencher une exception HorsEspaceJeuException");
    } catch (e) {
      if (!(e instanceof HorsEspaceJeuException)) {
        expect.fail(
          e.constructor.name,
          "HorsEspaceJeuException",
          "Mauvais type d'Exception"
        );
      }
    }

    try {
      spaceInvaders.positionnerUnNouveauVaisseau(new Dimension(1, 1), new Position(-1, 9));
      expect.fail("Position trop à gauche : devrait déclencher une exception HorsEspaceJeuException");
    } catch (e) {
      if (!(e instanceof HorsEspaceJeuException)) {
        expect.fail(
          e.constructor.name,
          "HorsEspaceJeuException",
          "Mauvais type d'Exception"
        );
      }
    }

    try {
      spaceInvaders.positionnerUnNouveauVaisseau(new Dimension(1, 1), new Position(14, 10));
      expect.fail("Position trop en bas : devrait déclencher une exception HorsEspaceJeuException");
    } catch (e) {
      if (!(e instanceof HorsEspaceJeuException)) {
        expect.fail(
          e.constructor.name,
          "HorsEspaceJeuException",
          "Mauvais type d'Exception"
        );
      }
    }

    try {
      spaceInvaders.positionnerUnNouveauVaisseau(new Dimension(1, 1), new Position(14, -1));
      expect.fail("Position trop en haut : devrait déclencher une exception HorsEspaceJeuException");
    } catch (e) {
      if (!(e instanceof HorsEspaceJeuException)) {
        expect.fail(
          e.constructor.name,
          "HorsEspaceJeuException",
          "Mauvais type d'Exception"
        );
      }
    }
  });

  it('should position ship with dimensions correctly', function () {
    spaceInvaders.positionnerUnNouveauVaisseau(new Dimension(3, 2), new Position(7, 9));
    expect("" +
      "...............\n" +
      "...............\n" +
      "...............\n" +
      "...............\n" +
      "...............\n" +
      "...............\n" +
      "...............\n" +
      "...............\n" +
      ".......VVV.....\n" +
      ".......VVV.....\n")
      .to.be.equal(spaceInvaders.recupererEspaceJeuDansChaineASCII());
  });

  it('should throw DebordementEspaceJeuException', function () {
    try {
      spaceInvaders.positionnerUnNouveauVaisseau(new Dimension(9, 2), new Position(7, 9));
      expect.fail("Dépassement du vaisseau à droite en raison de sa longueur trop importante : devrait déclencher une exception DebordementEspaceJeuException");
    } catch (e) {
      if (!(e instanceof DebordementEspaceJeuException)) {
        expect.fail(
          e.constructor.name,
          "DebordementEspaceJeuException",
          "Mauvais type d'Exception"
        );
      }
    }

    try {
      spaceInvaders.positionnerUnNouveauVaisseau(new Dimension(3, 4), new Position(7, 1));
      expect.fail("Dépassement du vaisseau vers le haut en raison de sa hauteur trop importante : devrait déclencher une exception DebordementEspaceJeuException");
    } catch (e) {
      if (!(e instanceof DebordementEspaceJeuException)) {
        expect.fail(
          e.constructor.name,
          "DebordementEspaceJeuException",
          "Mauvais type d'Exception"
        );
      }
    }
  });

  it('should NOT move ship to the right', function () {
    spaceInvaders.positionnerUnNouveauVaisseau(new Dimension(3, 2), new Position(12, 9), 3);
    spaceInvaders.deplacerVaisseauVersLaDroite();
    expect("" +
      "...............\n" +
      "...............\n" +
      "...............\n" +
      "...............\n" +
      "...............\n" +
      "...............\n" +
      "...............\n" +
      "...............\n" +
      "............VVV\n" +
      "............VVV\n")
      .to.be.equal(spaceInvaders.recupererEspaceJeuDansChaineASCII());
  });

  it('should move ship to the left', function () {
    spaceInvaders.positionnerUnNouveauVaisseau(new Dimension(3, 2), new Position(7, 9), 3);
    spaceInvaders.deplacerVaisseauVersLaGauche();

    expect("" +
      "...............\n" +
      "...............\n" +
      "...............\n" +
      "...............\n" +
      "...............\n" +
      "...............\n" +
      "...............\n" +
      "...............\n" +
      "....VVV........\n" +
      "....VVV........\n")
      .to.be.equal(spaceInvaders.recupererEspaceJeuDansChaineASCII());
  });

  it('should NOT move ship to the left', function () {
    spaceInvaders.positionnerUnNouveauVaisseau(new Dimension(3, 2), new Position(0, 9), 3);
    spaceInvaders.deplacerVaisseauVersLaGauche();

    expect("" +
      "...............\n" +
      "...............\n" +
      "...............\n" +
      "...............\n" +
      "...............\n" +
      "...............\n" +
      "...............\n" +
      "...............\n" +
      "VVV............\n" +
      "VVV............\n")
      .to.be.equal(spaceInvaders.recupererEspaceJeuDansChaineASCII());
  });

  it('shoud move the ship to the right', function () {
    spaceInvaders.positionnerUnNouveauVaisseau(new Dimension(3, 2), new Position(7, 9), 3);
    spaceInvaders.deplacerVaisseauVersLaDroite();
    expect("" +
      "...............\n" +
      "...............\n" +
      "...............\n" +
      "...............\n" +
      "...............\n" +
      "...............\n" +
      "...............\n" +
      "...............\n" +
      "..........VVV..\n" +
      "..........VVV..\n")
      .to.be.equal(spaceInvaders.recupererEspaceJeuDansChaineASCII());
  });

  it('should partially move the ship to the right', function () {
    spaceInvaders.positionnerUnNouveauVaisseau(new Dimension(3, 2), new Position(10, 9), 3);
    spaceInvaders.deplacerVaisseauVersLaDroite();
    expect("" +
      "...............\n" +
      "...............\n" +
      "...............\n" +
      "...............\n" +
      "...............\n" +
      "...............\n" +
      "...............\n" +
      "...............\n" +
      "............VVV\n" +
      "............VVV\n")
      .to.be.equal(spaceInvaders.recupererEspaceJeuDansChaineASCII());
  });

  it('should partially move the ship to the left', function () {
    spaceInvaders.positionnerUnNouveauVaisseau(new Dimension(3, 2), new Position(1, 9), 3);
    spaceInvaders.deplacerVaisseauVersLaGauche();
    expect("" +
      "...............\n" +
      "...............\n" +
      "...............\n" +
      "...............\n" +
      "...............\n" +
      "...............\n" +
      "...............\n" +
      "...............\n" +
      "VVV............\n" +
      "VVV............\n")
      .to.be.equal(spaceInvaders.recupererEspaceJeuDansChaineASCII());
  });
});