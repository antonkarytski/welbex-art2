import {
  Effect,
  attach,
  createEffect,
  createEvent,
  createStore,
} from 'effector'
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

type SubmitSettings<P, R> = {
  validate?: boolean
  request?: Effect<P, R>
}

export class FormModel<T extends Record<string, any>, R = any> {
  private readonly schema
  public readonly reset = createEvent()
  public readonly setFieldEvent = createEvent<FieldPair<T, keyof T>>()
  public setField<K extends keyof T>(props: FieldPair<T, K>) {
    this.setFieldEvent(props)
  }
  public readonly setSomeFields = createEvent<Partial<T>>()
  public readonly set = createEvent<T>()
  public readonly $store
  public readonly fields: { [K in keyof T]: K }
  public readonly keysList
  public readonly validation
  public readonly submit

  private submitRequest: Effect<T, any> | null = null
  private isValidateOnSubmit = false

  constructor(schema: T | ObjectSchema<T>, settings?: SubmitSettings<T, R>) {
    this.schema = schema
    const isYupSchema = schema.__isYupSchema__
    const initialState: T = schema.__isYupSchema__
      ? schema.getDefault()
      : schema
    this.$store = createStore<T>(initialState)
      .on(this.setFieldEvent, (store, { key, value }) => ({
        ...store,
        [key]: value,
      }))
      .on(this.setSomeFields, (store, fields) => ({ ...store, ...fields }))
      .on(this.set, (_, payload) => payload)
      .reset(this.reset)

    this.submit = attach({
      source: this.$store,
      mapParams: (_: void, store) => store,
      effect: createEffect<T, any extends R ? undefined : R>(async (props) => {
        if (this.isValidateOnSubmit) {
          const result = await this.validation.cast()
          if (!result.isValid) throw Error('Validation error')
        }
        if (!this.submitRequest) return
        return this.submitRequest(props)
      }),
    })

    this.validation = createValidator(schema, this.$store)
    if (settings) this.setUpSettings(settings)

    this.$store.watch(() => {
      this.validation.reset()
    })

    this.keysList = Object.keys(initialState) as (keyof T)[]
    if (isYupSchema) this.keysList.reverse()
    this.fields = mapObject(initialState, (_, key) => key) as {
      [K in keyof T]: K
    }
  }

  private setUpSettings(settings: SubmitSettings<T, R>) {
    if (settings.validate) {
      this.isValidateOnSubmit = true
    }
    if (settings.request) {
      this.submitRequest = settings.request
    }
  }

  public mapKeys<U>(fn: (value: keyof T) => U): U[] {
    return this.keysList.map(fn)
  }

  public setSubmitSettings<Return>(settings: SubmitSettings<T, Return>) {
    this.setUpSettings(settings as SubmitSettings<T, any>)
    return this as any as FormModel<T, Return>
  }
}

export const createFormModel = <T extends Record<string, any>>(
  initialFormState: T | ObjectSchema<T>
) => {
  return new FormModel<T>(initialFormState)
}
