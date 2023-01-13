import { MIN_DIST_BETWEEN_FLOORS } from "./constant"

export function SelectElement(selector: string) {
  const element = document.querySelector(selector)
  if (!element) throw new Error(selector + ' not found')
  return element
}

export function getRandomVerticalOffset() {
  return MIN_DIST_BETWEEN_FLOORS + Math.random() * 50
}

export function millisToMinutesAndSeconds(millis: number) {
  const minutes = Math.floor(millis / 60000);
  const seconds = Number(((millis % 60000) / 1000).toFixed(0));
  const milliSec = String(Math.floor(millis % 1000)).padStart(3, '0')
  return minutes + ":" + (seconds < 10 ? '0' : '') + seconds + ':' + milliSec;
}