import { createStore } from 'effector'
import { MOCK_PAYMENT_CARDS } from '../../_mock/payment'
import { PaymentCard } from './types'

export const $paymentCards = createStore<PaymentCard[]>(MOCK_PAYMENT_CARDS)
