import { Floor } from './Floor';
import { getRandomVerticalOffset } from './helper';

export class Game {
  floors: Floor[] = [];

  constructor(ctx: CanvasRenderingContext2D) {
    for (let i = 0; i < 5; i++) {
      this.floors.push(new Floor(ctx, i * getRandomVerticalOffset()));
    }
  }

  draw() {
    this.floors.forEach((floor) => floor.draw());
  }
}
