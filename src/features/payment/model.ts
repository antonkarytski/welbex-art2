import { attach, createEffect, createStore } from 'effector'
import { createStateModel } from 'altek-toolkit'
import { MOCK_PAYMENT_CARDS } from '../../_mock/payment'
import { CardPaymentMethod, PaymentCard } from './types'

export const $paymentCards = createStore<PaymentCard[]>(MOCK_PAYMENT_CARDS)

export const cardToDeleteModel = createStateModel<CardPaymentMethod | null>(
  null
)

const deletePaymentCardRequest = createEffect<
  CardPaymentMethod | null,
  string | null
>(async (cardToDelete) => {
  // await API request
  return cardToDelete?.number || null
})

export const deletePaymentCardFx = attach({
  source: cardToDeleteModel.$state,
  mapParams: (_: void, cardToDelete) => cardToDelete,
  effect: deletePaymentCardRequest,
})

$paymentCards.on(deletePaymentCardFx.done, (cards, { result }) => {
  return result ? cards.filter((card) => card.number !== result) : cards
})
