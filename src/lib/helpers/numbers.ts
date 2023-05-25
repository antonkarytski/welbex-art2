export const twoDigits = (value: number) =>
  (Math.round(value * 100) / 100).toFixed(2)

export function roundHalf(num: number) {
  return Math.round(num * 2) / 2
}

export function getNumberPostfixWordDeclension({
  number,
  singularText,
  pluralLessThenFiveText,
  pluralEndsWithOneText,
  pluralText,
}: {
  number: number
  singularText: string
  pluralEndsWithOneText: string
  pluralLessThenFiveText: string
  pluralText: string
}) {
  let result = pluralText
  const lastNumber = Number(String(number).slice(-1))
  if (number === 1) {
    result = singularText
  }
  if (number > 1 && lastNumber === 1) {
    result = pluralEndsWithOneText
  }
  if (lastNumber > 1 && lastNumber < 5 && (number > 20 || number < 10)) {
    result = pluralLessThenFiveText
  }
  return result
}
