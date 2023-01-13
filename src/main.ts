import { drawBackground } from './background';
import { CANVAS_HEIGHT, CANVAS_WIDTH, MIN_DIST_BETWEEN_FLOORS, NUMBER_OF_TRIANGLES, CEILING_BLADE_HEIGHT, CEILING_BLADE_WIDTH } from './constant';
import { Floor } from './Floor';
import { Game } from './Game';
import { getRandomVerticalOffset, SelectElement } from './helper';
import { Player } from './Player';

const canvas = SelectElement('canvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;
window.devicePixelRatio = 2;

const timeDisplay = SelectElement('#time-value') as HTMLSpanElement;
const goLeftBtn = SelectElement('#go-left-button') as HTMLButtonElement;
const goRightBtn = SelectElement('#go-right-button') as HTMLButtonElement;
const resetBtn = SelectElement('#reset-button') as HTMLButtonElement;

let frameNumber: number;
const game = new Game(ctx, timeDisplay);
const player = new Player(ctx, game);
function render() {
  clear(ctx);
  drawBackground(ctx);
  player.draw();
  game.draw();
  frameNumber = requestAnimationFrame(render);
}

function clear(ctx: CanvasRenderingContext2D) {
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
}

render();

document.addEventListener('keydown', (e) => {
  switch (e.key) {
    case 'a':
      handleGoLeft();
      break;
    case 'd':
      handleGoRight();
      break;
    default:
  }
});

function handleGoLeft() {
  player.goLeft();
  if (game.getState() === 'ready') {
    game.start();
  }
}

function handleGoRight() {
  player.goRight();
  if (game.getState() === 'ready') {
    game.start();
  }
}

document.addEventListener('keypress', (e) => {
  if (e.code === 'Space') {
    e.preventDefault();
    game.reset();
    player.reset();
  }
});
document.addEventListener('keyup', () => {
  player.stop();
});

goLeftBtn.addEventListener('pointerdown', () => {
  handleGoLeft();
});

goRightBtn.addEventListener('pointerdown', () => {
  handleGoRight();
});

goLeftBtn.addEventListener('pointerup', () => {
  player.stop();
});

goRightBtn.addEventListener('pointerup', () => {
  player.stop();
});

resetBtn.addEventListener('click', () => {
  game.reset();
  player.reset();
});

window.addEventListener('blur', () => {
  if (game.getState() === 'playing') {
    game.stop();
  }
});
