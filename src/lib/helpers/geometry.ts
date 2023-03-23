export const calcHypotenuse = (a: number, b: number) => {
  return Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2))
}

export type TouchCoordinates = {
  x: number
  y: number
}

export const calcDistanceBetweenTouches = (
  firstTouch: TouchCoordinates,
  secondTouch: TouchCoordinates
) => {
  const x = firstTouch.x - secondTouch.x
  const y = firstTouch.y - secondTouch.y

  return calcHypotenuse(x, y)
}
