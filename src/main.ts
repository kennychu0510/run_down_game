import { drawBackground } from './background';
import { CANVAS_HEIGHT, CANVAS_WIDTH, MIN_DIST_BETWEEN_FLOORS, NUMBER_OF_TRIANGLES, TRIANGLE_HEIGHT, TRIANGLE_WIDTH } from './constant';
import { Floor } from './Floor';
import { Game } from './Game';
import { getRandomVerticalOffset, SelectElement } from './helper';
import { Player } from './Player';

const canvas = SelectElement('canvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;

let frameNumber: number;
const game = new Game(ctx)
const player = new Player(ctx, game)
function render() {
  clear(ctx)
  drawBackground(ctx)
  game.draw()
  player.draw(frameNumber)
  frameNumber = requestAnimationFrame(render);
}

function clear(ctx: CanvasRenderingContext2D) {
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
}

render();

document.addEventListener('keydown', (e) => {
  switch (e.key) {
    case 'a':
      player.goLeft()
      if (game.getState() === 'ready') {
        game.start()
      }
      break;
    case 'd':
      player.goRight()
      if (game.getState() === 'ready') {
        game.start()
      }
      break;
    default:
  }
})
document.addEventListener('keyup', () => {
  player.stop()
})