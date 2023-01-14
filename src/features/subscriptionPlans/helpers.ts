import { LangStructure } from '../../translations/types'

export function getSubscriptionPriceText(
  pricePerMonth: number,
  text: LangStructure
) {
  return `$ ${pricePerMonth} / ${text.month}`
}
