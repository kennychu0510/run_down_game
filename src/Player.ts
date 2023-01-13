import { CANVAS_WIDTH, CANVAS_HEIGHT, CEILING_BLADE_HEIGHT } from './constant';
import { Game } from './Game';

export const playerImg = new Image();
playerImg.src = './images/player_sprite.png';

const SPRITE_HEIGHT = 16
const SPRITE_Y_OFFSET = 24
const SPRITE_WIDTH = 14

export class Player {
  x = CANVAS_WIDTH / 2 - SPRITE_WIDTH/2;
  y = CANVAS_HEIGHT / 2 - SPRITE_HEIGHT/2;
  ctx: CanvasRenderingContext2D;
  game: Game;
  state: 'left' | 'right' | 'stand';
  frame = 0;
  image = new Image()
  tick = 0;
  gravity = 0.05;
  ySpeed = 0;
  frameMax = 2;
  spriteHeight = 16;
  spriteWidth = 14

  constructor(ctx: CanvasRenderingContext2D, game: Game) {
    this.ctx = ctx;
    this.game = game;
    this.state = 'stand';
    this.image.src = './images/mario.png'
  }

  renderSprite() {
    this.ctx.drawImage(this.image, 0, this.frame * (SPRITE_HEIGHT + SPRITE_Y_OFFSET), this.image.width, SPRITE_HEIGHT, this.x, this.y, this.image.width, SPRITE_HEIGHT)

    this.tick++

    if (this.tick % 5 === 0) {
      this.frame++;
      if (this.frame === this.frameMax) {
        this.frame = 0;
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
      if (this.y + this.spriteHeight >= floors[i].y && this.x <= floors[i].x + floors[i].width && this.x + this.spriteWidth > floors[i].x && this.y < floors[i].y) {
        this.y = floors[i].y - this.spriteHeight;
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
    this.x = CANVAS_WIDTH / 2 - SPRITE_WIDTH/2;
    this.y = CANVAS_HEIGHT / 2 - SPRITE_HEIGHT/2;
    this.ySpeed = 0;
  }
}
