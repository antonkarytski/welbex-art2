import { createFormModel } from '../../lib/forms/model'

export const initialLogInFormState = {
  email: '',
  password: '',
}

export const { $store, setField } = createFormModel<
  typeof initialLogInFormState
>(initialLogInFormState)
