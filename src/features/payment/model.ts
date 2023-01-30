import { createStore } from 'effector'
import { createStateModel } from 'altek-toolkit'
import { MOCK_PAYMENT_CARDS } from '../../_mock/payment'
import { PaymentCard, PaymentMethod } from './types'

export const $paymentCards = createStore<PaymentCard[]>(MOCK_PAYMENT_CARDS)

export const cardToDeleteModel = createStateModel<PaymentMethod | null>(null)
