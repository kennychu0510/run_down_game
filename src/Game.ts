import { CANVAS_WIDTH, CANVAS_HEIGHT } from './constant';
import { Floor } from './Floor';
import { getRandomVerticalOffset } from './helper';

export class Game {
  floors: Floor[] = [];
  speed = 1;
  private state = 'ready';
  ctx: CanvasRenderingContext2D

  constructor(ctx: CanvasRenderingContext2D) {
    for (let i = 0; i < 5; i++) {
      this.floors.push(new Floor(ctx, i * getRandomVerticalOffset()));
    }
    this.ctx = ctx
  }

  draw() {
    switch (this.state) {
      case 'playing':
        this.floors.forEach((floor) => floor.draw(this.speed));
        break;
      case 'ready':
        this.ctx.font = '18px serif'
        this.ctx.textAlign = 'center'
        this.ctx.fillStyle = 'white'
        this.ctx.fillText(`Press 'A' or 'D' to start the game`, CANVAS_WIDTH/2, CANVAS_HEIGHT/2 * 0.8)
        break;
      case 'stopped':
        this.ctx.font = '18px serif'
        this.ctx.textAlign = 'center'
        this.ctx.fillStyle = 'white'
        this.ctx.fillText(`Nice Try :)`, CANVAS_WIDTH/2, CANVAS_HEIGHT/2 * 0.8)
        break;
      default:
        console.log(this.state + ' not handled')
    }
  }

  getState() {
    return this.state;
  }

  start() {
    this.state = 'playing';
  }

  stop() {
    this.state = 'stopped';
  }

}
