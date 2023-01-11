import { CANVAS_HEIGHT, CANVAS_WIDTH } from "./constant";
import { getRandomVerticalOffset } from "./helper";

export class Floor {
  width: number;
  height = 10;
  ctx: CanvasRenderingContext2D;
  y = CANVAS_HEIGHT;
  x = 0;
  speed = 0.5;

  constructor(ctx: CanvasRenderingContext2D, offset?: number) {
    const newWidth = Math.round(100 + Math.random() * 50);
    this.width = newWidth
    this.ctx = ctx;
    this.x = Math.round(Math.random() * (CANVAS_WIDTH - newWidth));
    if (offset) {
      this.y += offset;
    }
  }

  draw() {
    this.ctx.strokeStyle = 'white';
    this.ctx.fillStyle = 'white';
    this.ctx.beginPath()
    this.ctx.fillRect(this.x, this.y, this.width, this.height);
    this.ctx.stroke();
    this.y -= this.speed;
    if (this.y < 0) {
      this.y = CANVAS_HEIGHT;
      this.init();
    }
  }

  init() {
    const newWidth = Math.round(100 + Math.random() * 50);
    this.width = newWidth
    this.x = Math.round(Math.random() * (CANVAS_WIDTH - newWidth));
    this.y += getRandomVerticalOffset()
  }
}