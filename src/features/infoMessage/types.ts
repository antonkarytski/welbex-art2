import { IfIncludeUndefined, UnionFrom } from '../../types'
import { PlanDescriptor } from '../subscriptionPlans/types'

export enum InfoMessageType {
  CARD_DELETED = 'CARD_DELETED',
  SUCCESSFUL_PAYMENT = 'SUCCESSFUL_PAYMENT',
  CARD_SAVED = 'CARD_SAVED',
  SIGNED_OFF = 'SIGNED_OFF',
  PAYMENT_ERROR = 'PAYMENT_ERROR',
  CONNECTION_ERROR = 'CONNECTION_ERROR',
  POST_CREATED = 'POST_CREATED',
  FEEDBACK_SUCCESS = 'FEEDBACK_SUCCESS',
}

type InfoMessageScreenPropsProto<
  T extends Partial<Record<InfoMessageType, any>>
> =
  | UnionFrom<{
      [K in keyof T]: IfIncludeUndefined<
        T[K],
        { type: K; payload?: T[K] },
        { type: K; payload: T[K] }
      >
    }>
  | UnionFrom<{
      [K in Exclude<InfoMessageType, keyof T>]: { type: K; payload?: never }
    }>

export type InfoMessageScreenProps = InfoMessageScreenPropsProto<{
  [InfoMessageType.CARD_SAVED]: { currentPayment?: PlanDescriptor } | undefined
  [InfoMessageType.SUCCESSFUL_PAYMENT]: { currentPayment: PlanDescriptor }
  [InfoMessageType.POST_CREATED]: { nextMonth?: boolean }
}>

export type InfoMessageScreenVariant = 'light' | 'primary'
