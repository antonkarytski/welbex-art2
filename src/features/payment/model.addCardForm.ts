import { createFormModel } from '../../lib/models/form/model.form'

type AddCardForm = {
  number: string
  expirationDate: string
  cvc: string
  nameOnCard: string
}

const initialAddCardForm: AddCardForm = {
  number: '',
  expirationDate: '',
  cvc: '',
  nameOnCard: '',
}

export const addCardFormModel = createFormModel(initialAddCardForm)
