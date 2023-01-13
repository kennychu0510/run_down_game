import { CANVAS_WIDTH, CANVAS_HEIGHT } from './constant';
import { Game } from './Game';

export const playerImg = new Image();
playerImg.src = './src/images/player_sprite.png';

const IMAGE_PATH = './src/images/'

export class Player {
  x = CANVAS_WIDTH / 2;
  y = CANVAS_HEIGHT / 2;
  ctx: CanvasRenderingContext2D;
  game: Game;
  state: 'left' | 'right' | 'stand';
  frame = 0;
  image

  constructor(ctx: CanvasRenderingContext2D, game: Game) {
    this.ctx = ctx;
    this.game = game;
    this.state = 'stand';
    this.image = {
      name: 'player_static',
      frames: 2,
      current: 1,
      image: new Image()
    }
  }

  renderSprite(renderFrame: number) {
    this.image.image.src = IMAGE_PATH + this.image.name + '_' + this.image.current + '.png'
    this.ctx.drawImage(this.image.image, this.x, this.y)

    if (renderFrame % 5 === 0) {
      this.image.current++
      if (this.image.current > this.image.frames) {
        this.image.current = 1
      }
    }
  }

  draw(frame: number) {
    this.renderSprite(frame)

    if (this.y > CANVAS_HEIGHT) {
      // this.y = 0;
      this.game.stop()
    }

    if (this.game.getState() === 'playing') {
      this.handleMovement(frame)
    }
  }

  private checkForCollision() {
    const floors = this.game.floors;
    for (let i = 0; i < this.game.floors.length; i++) {
      if (this.y + this.image.image.height >= floors[i].y && this.x <= floors[i].x + floors[i].width && this.x + this.image.image.width > floors[i].x && this.y < floors[i].y) {
        this.y = floors[i].y - this.image.image.height;
        return true;
      }
    }
    return false;
  }

  goLeft() {
    this.state = 'left';
  }

  goRight() {
    this.state = 'right';
  }

  stop() {
    this.state = 'stand';
  }

  handleGravity() {
    if (!this.checkForCollision()) {
      this.y++;
    }
  }

  handleMovement(frame: number) {
    this.handleGravity()
    if (this.state === 'left') {
      this.x--;
      if (frame % 5 === 0) {
        this.frame++;
      }
      if (this.frame > 3) {
        this.frame = 1;
      }
    } else if (this.state === 'right') {
      this.x++;
    } else {
      this.frame = 0;
    }
  }
}
