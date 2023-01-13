import { NUMBER_OF_TRIANGLES, CEILING_BLADE_WIDTH, CEILING_BLADE_HEIGHT, CANVAS_WIDTH } from "./constant"

export function drawBackground(ctx: CanvasRenderingContext2D) {
  ctx.fillStyle = 'white'
  ctx.beginPath()
  ctx.moveTo(0, 0)
  for (let i = 1; i <= (CANVAS_WIDTH * 2 / CEILING_BLADE_WIDTH); i++) {
    if (i % 2 === 0) {
      ctx.lineTo(i * CEILING_BLADE_WIDTH/2, 0)
    } else {
      ctx.lineTo(i * CEILING_BLADE_WIDTH/2, CEILING_BLADE_HEIGHT)
    }
  }
  ctx.closePath()
  ctx.fill()
}