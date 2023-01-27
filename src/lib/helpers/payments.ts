import { last4 } from './strings'

export function secureCard(cardNumber: string) {
  return `•••• •••• •••• ${last4(cardNumber)}`
}
