export default class DebordementEspaceJeuException extends Error {
  constructor(m: string) {
    super(m);
    Object.setPrototypeOf(this, DebordementEspaceJeuException.prototype);
  }
}