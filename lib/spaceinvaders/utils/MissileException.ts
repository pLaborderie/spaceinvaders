export default class MissileException extends Error {
    constructor(m: string) {
      super(m);
      Object.setPrototypeOf(this, MissileException.prototype);
    }
  }