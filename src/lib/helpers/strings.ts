export function last4(cardNumber: string) {
  return cardNumber.slice(-4)
}

export function truncateString(text = '', length = 10) {
  if (text.length <= length + 2) return text
  return text.slice(0, length) + '...'
}
