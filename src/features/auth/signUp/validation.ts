import { createEffect, createEvent, createStore } from 'effector'
import * as yup from 'yup'

export const loginFirstScreenSchema = yup.object().shape({
  name: yup.string().required(),
  lastName: yup.string().required(),
  birthDate: yup.date().required(),
  email: yup.string().email().required(),
})

export const validateFirstStepFx = createEffect()
