import { CANVAS_WIDTH, CANVAS_HEIGHT } from './constant';
import { Game } from './Game';

const IMAGE_WIDTH = 153;
const IMAGE_HEIGHT = 24;
const FRAME_WIDTH = IMAGE_WIDTH / 8;

export const playerImg = new Image();
playerImg.src = './src/images/player_sprite.png';

export class Player {
  x = CANVAS_WIDTH / 2;
  y = CANVAS_HEIGHT / 2;
  image = playerImg;
  ctx: CanvasRenderingContext2D;
  game: Game;
  state: string;
  constructor(ctx: CanvasRenderingContext2D, game: Game) {
    this.ctx = ctx;
    this.game = game;
    this.state = 'stand'
  }

  draw() {
    this.ctx.drawImage(this.image, 0, 0, FRAME_WIDTH, IMAGE_HEIGHT, this.x, this.y, FRAME_WIDTH, IMAGE_HEIGHT);
    if (this.y > CANVAS_HEIGHT) {
      this.y = 0;
    }
    if (!this.checkForCollision()) {
      this.y++;
    }
    if (this.state === 'left') {
      this.x--;
    } else if (this.state === 'right') {
      this.x++;
    } 
  }

  private checkForCollision() {
    const floors = this.game.floors;
    for (let i = 0; i < this.game.floors.length; i++) {
      if (this.y + IMAGE_HEIGHT >= floors[i].y && this.x <= (floors[i].x + floors[i].width) && (this.x + FRAME_WIDTH > floors[i].x) && this.y < floors[i].y) {
        this.y = floors[i].y - IMAGE_HEIGHT;
        return true;
      }
    }
    return false;
  }

  goLeft() {
    this.state = 'left'
  }

  goRight() {
    this.state = 'right'
  }

  stop() {
    this.state = 'stand'
  }
}
