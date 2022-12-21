import { createEffect, createEvent, createStore } from 'effector'
import { ISignUpForm } from './types'

export const initialSignUpFormState: ISignUpForm = {
  name: '',
  lastName: '',
  birthDate: '',
  email: '',
  country: '',
}

export interface SetFieldPayload {
  key: keyof ISignUpForm
  value: string
}

export const setField = createEvent<SetFieldPayload>()
export const setMainFieldsCompleted = createEvent()

export const $signUpForm = createStore<ISignUpForm>(initialSignUpFormState).on(
  setField,
  (store, { key, value }) => ({
    ...store,
    [key]: value,
  })
)
