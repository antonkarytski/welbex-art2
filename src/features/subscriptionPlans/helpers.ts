import { getNumberPostfixWordDeclension } from '../../lib/helpers/numbers'
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
  return getNumberPostfixWordDeclension({
    number: amount,
    singularText: text.oneMonth,
    pluralText: text.monthsInGenitive,
    pluralEndsWithOneText: text.monthsInGenitiveEndsWithOne,
    pluralLessThenFiveText: text.monthsInGenitiveLessThenFive,
  })
}
