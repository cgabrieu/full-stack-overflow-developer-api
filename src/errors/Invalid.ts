export default class Invalid extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'Invalid';
  }
}
