import { CANVAS_WIDTH, CANVAS_HEIGHT, CEILING_BLADE_HEIGHT } from './constant';
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
  image;
  tick = 0;
  gravity = 0.05;
  ySpeed = 0;

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

  renderSprite() {
    this.image.image.src = IMAGE_PATH + this.image.name + '_' + this.image.current + '.png'
    this.ctx.drawImage(this.image.image, this.x, this.y)

    this.tick++

    if (this.tick % 5 === 0) {
      this.image.current++
      if (this.image.current > this.image.frames) {
        this.image.current = 1
      }
    }
  }

  draw() {
    this.renderSprite()

    if (this.y > CANVAS_HEIGHT) {
      // this.y = 0;
      this.game.stop()
    }

    if (this.y <= CEILING_BLADE_HEIGHT) {
      this.game.stop()
    }

    if (this.game.getState() === 'playing') {
      this.handleMovement()
    }
  }

  private checkForCollision() {
    const floors = this.game.floors;
    for (let i = 0; i < this.game.floors.length; i++) {
      if (this.y + this.image.image.height >= floors[i].y && this.x <= floors[i].x + floors[i].width && this.x + this.image.image.width > floors[i].x && this.y < floors[i].y) {
        this.y = floors[i].y - this.image.image.height;
        this.ySpeed = 0;
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
      this.ySpeed += this.gravity
      this.y += this.ySpeed
    }
  }

  handleMovement() {
    this.handleGravity()
    if (this.state === 'left') {
      this.x--;
      
    } else if (this.state === 'right') {
      this.x++;
    } 
  }

  reset() {
    this.x = CANVAS_WIDTH / 2;
    this.y = CANVAS_HEIGHT / 2;
  }
}
