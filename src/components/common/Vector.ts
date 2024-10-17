export class Vector2 {
  constructor(
    public x: number,
    public y: number
  ) {}

  static zero() {
    return new Vector2(0, 0);
  }

  static one() {
    return new Vector2(1, 1);
  }
}
