import { CANVAS_WIDTH, CANVAS_HEIGHT } from './constant';
import { Floor } from './Floor';
import { getRandomVerticalOffset, millisToMinutesAndSeconds } from './helper';

export class Game {
  floors: Floor[] = [];
  speed = 1;
  private state = 'ready';
  ctx: CanvasRenderingContext2D;
  startTime: Date;
  timeDisplay: HTMLSpanElement
  level = 0;

  constructor(ctx: CanvasRenderingContext2D, timeDisplay: HTMLSpanElement) {
    for (let i = 0; i < 5; i++) {
      this.floors.push(new Floor(ctx, i * getRandomVerticalOffset()));
    }
    this.ctx = ctx
    this.startTime = new Date()
    this.timeDisplay = timeDisplay
  }

  draw() {
    switch (this.state) {
      case 'playing':
        this.floors.forEach((floor) => floor.draw(this.speed));
        const currentTime = new Date();
        const timeElapsed = currentTime.getTime() - this.startTime.getTime()
        this.timeDisplay.innerHTML = millisToMinutesAndSeconds(timeElapsed)
        if (Math.floor(timeElapsed/10000) > this.level) {
          this.speed += 0.2
          console.log('level:', this.level)
          console.log('speed:', this.speed)
        }
        this.level = Math.floor(timeElapsed/10000)
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
        this.ctx.fillText(`You lasted ${this.timeDisplay.innerText}`, CANVAS_WIDTH/2, CANVAS_HEIGHT/2)
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
    this.startTime = new Date();
    console.log('GAME STARTED')
  }

  stop() {
    if (this.state !== 'stopped') {
      this.state = 'stopped';
      console.log('GAME STOPPED')
    }
  }

  reset() {
    console.log('GAME RESET')
    this.init();
  }

  init() {
    this.floors = [];
    for (let i = 0; i < 5; i++) {
      this.floors.push(new Floor(this.ctx, i * getRandomVerticalOffset()));
    }
    this.state = 'ready'
    this.speed = 1;
  }
}


