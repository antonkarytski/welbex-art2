import React from 'react'

export enum PaymentMethodType {
  APPLE_PAY = 'applePay',
  GOOGLE_PAY = 'googlePay',
  CARD = 'card',
}

export type PaymentMethodDescriptor = {
  label: string
  Icon: (props: any) => React.ReactElement
}

export type PaymentCard = {
  number: string
}

export type ServicePaymentMethod = {
  method: PaymentMethodType.APPLE_PAY | PaymentMethodType.GOOGLE_PAY
} & PaymentMethodDescriptor &
  Partial<Record<keyof PaymentCard, never>>

export type CardPaymentMethod = {
  method: PaymentMethodType.CARD
} & PaymentMethodDescriptor &
  PaymentCard

export type PaymentMethod = ServicePaymentMethod | CardPaymentMethod
