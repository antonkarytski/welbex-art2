import { LangStructure } from '../../translations/types'

export function getSubscriptionPriceText(
  pricePerMonth: number,
  text: LangStructure
) {
  return `$ ${pricePerMonth} / ${text.month}`
}

export function getSubscriptionMonthsAmountText(
  amount: number,
  text: LangStructure
) {
  if (amount === 1) return `${text.oneMonth}`
  if (amount > 4 && amount < 21) return `${text.monthsInGenitive}`
  const lastNumber = +amount.toString().substr(-1)
  if (lastNumber < 0) return `${text.monthsInGenitive}`
  if (lastNumber < 5) return `${text.monthsInGenitiveLessThenFive}`
  return `${text.monthsInGenitive}`
}
