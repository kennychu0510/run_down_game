import { MIN_DIST_BETWEEN_FLOORS } from "./constant"

export function SelectElement(selector: string) {
  const element = document.querySelector(selector)
  if (!element) throw new Error(selector + ' not found')
  return element
}

export function getRandomVerticalOffset() {
  return MIN_DIST_BETWEEN_FLOORS + Math.random() * 50
}