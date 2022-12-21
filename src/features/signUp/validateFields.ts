import { createEffect, createEvent, createStore } from 'effector'
import * as yup from 'yup'
import { ISignUpForm } from './types'

let loginFirstScreenSchema = yup.object().shape({
  name: yup.string().required(),
  lastName: yup.string().required(),
  birthDate: yup.date().required(),
  email: yup.string().email().required(),
})

export const checkFields = (
  form: Exclude<ISignUpForm, ISignUpForm['country']>
) => {
  const castedForm = loginFirstScreenSchema.cast(form)
  return loginFirstScreenSchema.isValid(castedForm).catch((err) => {
    console.log('validation err', err)
    return err.errors
  })
}

export const validateFirstStepFx = createEffect()
