export const twoDigits = (value: number) =>
  (Math.round(value * 100) / 100).toFixed(2)
