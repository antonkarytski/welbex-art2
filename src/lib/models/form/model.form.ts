import { createEvent, createStore, restore } from 'effector'
import { ObjectSchema } from 'yup'
import { mapObject } from '../../helpers/array'
import { createValidator } from './model.validation'

export type FieldPair<T, K extends keyof T = keyof T> = { key: K; value: T[K] }

export type FormFieldComponentProps<T extends Record<string, string>> = {
  name: keyof T
  formModel: FormModel<T>
}

export type TypedFormFieldComponentProps<
  T extends Record<string, any>,
  K extends keyof T,
  ST
> = {
  name: T[K] extends ST ? K : never
  formModel: FormModel<T>
}

export class FormModel<T extends Record<string, any>> {
  public readonly setField = createEvent<FieldPair<T, keyof T>>()
  public readonly set = createEvent<T>()
  public readonly $store

  public readonly fields: { [K in keyof T]: K }
  public readonly keysList
  public readonly validation

  constructor(schema: T | ObjectSchema<T>) {
    const isYupSchema = schema.__isYupSchema__
    const initialState: T = schema.__isYupSchema__
      ? schema.getDefault()
      : schema
    this.$store = createStore<T>(initialState)
      .on(this.setField, (store, { key, value }) => ({
        ...store,
        [key]: value,
      }))
      .on(this.set, (_, payload) => payload)

    this.validation = createValidator(schema, this.$store)

    this.$store.watch(() => {
      this.validation.reset()
    })

    this.keysList = Object.keys(initialState) as (keyof T)[]
    if (isYupSchema) this.keysList.reverse()
    this.fields = mapObject(initialState, (_, key) => key) as {
      [K in keyof T]: K
    }
  }

  public mapKeys<U>(fn: (value: keyof T) => U): U[] {
    return this.keysList.map(fn)
  }
}

export const createFormModel = <T extends Record<string, any>>(
  initialFormState: T | ObjectSchema<T>
) => {
  return new FormModel<T>(initialFormState)
}
