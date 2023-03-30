export const calcHypotenuse = (a: number, b: number) => {
  return Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2))
}

export type Coordinates = {
  x: number
  y: number
}

export const calcDistanceBetweenCoords = (
  firstTouch: Coordinates,
  secondTouch: Coordinates
) => {
  const x = firstTouch.x - secondTouch.x
  const y = firstTouch.y - secondTouch.y

  return calcHypotenuse(x, y)
}
