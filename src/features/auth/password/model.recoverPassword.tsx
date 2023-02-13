import { createFormModel } from '../../../lib/models/form/model.form'

type recoverPasswordForm = {
  email: string
}

export const initialRecoverPasswordFormState: recoverPasswordForm = {
  email: '',
}

export const recoverPasswordFormModel = createFormModel(
  initialRecoverPasswordFormState
)
