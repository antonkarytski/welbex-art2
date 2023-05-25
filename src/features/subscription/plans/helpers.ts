import {
  Subscription,
  SubscriptionCurrency,
} from '../../../api/parts/subscriptions/types'
import {
  getNumberPostfixWordDeclension,
  roundHalf,
  twoDigits,
} from '../../../lib/helpers/numbers'
import { LangStructure } from '../../../translations/types'
import { PlanDescriptor } from './types'

const SUBSCRIPTION_CURRENCY_SYMBOL: Record<SubscriptionCurrency, string> = {
  [SubscriptionCurrency.RUB]: 'RUB',
  [SubscriptionCurrency.USD]: '$',
}

export function getCurrencySymbol(currency: SubscriptionCurrency) {
  return SUBSCRIPTION_CURRENCY_SYMBOL[currency]
}

export function getSubscriptionPriceText(
  pricePerMonth: number,
  currency: SubscriptionCurrency,
  text: LangStructure
) {
  const symbol = getCurrencySymbol(currency)
  if (currency === SubscriptionCurrency.RUB) {
    return `${pricePerMonth} ${symbol} / ${text.month}`
  }
  return `${symbol} ${pricePerMonth} / ${text.month}`
}

export function getFullPrice(subscription: Subscription) {
  return twoDigits(roundHalf(subscription.price * subscription.duration))
}

export function getFullPriceText(plan: Subscription) {
  const symbol = getCurrencySymbol(plan.currency)
  const price = getFullPrice(plan)
  if (plan.currency === SubscriptionCurrency.RUB) {
    return `${price} ${symbol}`
  }
  return `${symbol} ${price}`
}
export function getPromotion(smallestPlan: Subscription, plan: Subscription) {
  return roundHalf((1 - plan.price / smallestPlan.price) * 100)
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

export function getPlanDescription(plan: PlanDescriptor, text: LangStructure) {
  const monthText = getSubscriptionMonthsAmountText(plan.duration, text)
  const fullPrice = getFullPriceText(plan)
  return `${plan.duration} ${monthText} / ${fullPrice}`
}

export function convertToPlanDescriptor(
  plans: Subscription[]
): PlanDescriptor[] {
  const smallestPlan = plans[0]
  return plans.map((plan) => {
    return {
      ...plan,
      fullPrice: getFullPrice(plan),
      promotion: getPromotion(smallestPlan, plan),
    }
  })
}
