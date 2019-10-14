export default class HorsEspaceJeuException extends Error {
  constructor(m: string) {
    super(m);
    Object.setPrototypeOf(this, HorsEspaceJeuException.prototype);
  }
}