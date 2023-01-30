import { secureCard } from '../../lib/helpers/payments'
import AppleIcon from '../../ui/icons/Icon.Apple'
import GoogleIcon from '../../ui/icons/Icon.Google'
import MasterCardIcon from '../../ui/icons/Icon.MasterCard'
import {
  CardPaymentMethod,
  PaymentCard,
  PaymentMethod,
  PaymentMethodType,
} from './types'

export const SERVICE_PAYMENT_METHODS: PaymentMethod[] = [
  {
    method: PaymentMethodType.GOOGLE_PAY,
    Icon: GoogleIcon,
    label: 'Google Pay',
  },
  {
    method: PaymentMethodType.APPLE_PAY,
    Icon: AppleIcon,
    label: 'Apple Pay',
  },
]

export function convertCardToPaymentMethod(
  card: PaymentCard
): CardPaymentMethod {
  return {
    ...card,
    method: PaymentMethodType.CARD,
    Icon: MasterCardIcon,
    label: secureCard(card.number),
  }
}

export function bankCardsToPaymentMethods(
  cards: PaymentCard[]
): PaymentMethod[] {
  return cards.map(convertCardToPaymentMethod)
}

export function createPaymentMethods(cards: PaymentCard[]): PaymentMethod[] {
  return [...SERVICE_PAYMENT_METHODS, ...bankCardsToPaymentMethods(cards)]
}
