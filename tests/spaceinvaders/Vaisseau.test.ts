import { expect } from "chai";
import "mocha";
import Vaisseau from "../../lib/spaceinvaders/Vaisseau";
import Dimension from "../../lib/spaceinvaders/Dimension";
import Position from "../../lib/spaceinvaders/Position";
import MissileException from "../../lib/spaceinvaders/utils/MissileException";

describe('Testing Vaisseau class', function() {
    it('should throw when missile is longer than vaisseau', function() {
        const vaisseau: Vaisseau = new Vaisseau(new Dimension(5, 2), new Position(5, 9), 1);
        expect(() => {
            vaisseau.tirerUnMissile(new Dimension(7, 2), 1);
        }).to.throw(MissileException);
    });
});