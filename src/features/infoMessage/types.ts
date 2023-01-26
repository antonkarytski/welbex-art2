export enum InfoMessageType {
  CARD_DELETED = 'CARD_DELETED',
  SUCCESSFUL_PAYMENT = 'SUCCESSFUL_PAYMENT',
  CARD_SAVED = 'CARD_SAVED',
  SIGNED_OFF = 'SIGNED_OFF',
  PAYMENT_ERROR = 'PAYMENT_ERROR',
  CONNECTION_ERROR = 'CONNECTION_ERROR',
}

type InfoMessageSpecifiedScreenProps<
  N extends InfoMessageType,
  Payload extends Record<string, string | number> | never = never
> = {
  type: InfoMessageType
} & Payload extends never
  ? { payload?: never }
  : { payload: Payload }

type PaymentSuccessfulInfoMessageProps = InfoMessageSpecifiedScreenProps<
  InfoMessageType.SUCCESSFUL_PAYMENT,
  {
    subscriptionAmount: number
  }
>
export type InfoMessageScreenVariant = 'light' | 'primary'
