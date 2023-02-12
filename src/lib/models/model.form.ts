import { createEffect, createEvent, createStore } from 'effector'
import { useStoreMap } from 'effector-react'
import { attach } from 'effector/effector.cjs'
import { ObjectSchema, ValidationError } from 'yup'
import { useCallback } from 'react'
import { mapObject } from '../helpers/array'

export type FieldPair<T, K extends keyof T = keyof T> = { key: K; value: T[K] }
export type ValidationFieldPair<K extends string | number | symbol = string> = {
  key: K
  value: ValidationState
}
export type ValidationList<T extends Record<string, any>> = Record<
  keyof T,
  ValidationState | null
>

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

type ValidationState<M extends string = string> = {
  isValid: boolean
  message?: M
}

type ValidateFieldProps<T extends Record<string, any>> = {
  field: FieldPair<T>
  validation: ValidationList<T>
  isValid: boolean
}

const valid: ValidationState = {
  isValid: true,
}

const invalid = (message: string): ValidationState => ({
  isValid: false,
  message,
})

function validateWoSchema<T extends Record<string, any>>(
  fields: T,
  defaultValues?: T
) {
  let isValid = true
  const list = mapObject(fields, (value, key) => {
    if (value || (defaultValues && defaultValues[key] === undefined)) {
      return valid
    }
    isValid = false
    return invalid('Field is required')
  })
  return { list, isValid }
}

function mergeValidation<T extends Record<string, any>>(
  currentValidation: ValidationList<T>,
  field: ValidationFieldPair<keyof T>
) {
  const list = { ...currentValidation, [field.key]: field.value }
  for (const key in list) {
    if (list[key] !== valid) return { list, isValid: false }
  }
  return { list, isValid: true }
}

export class FormModel<T extends Record<string, any>> {
  public readonly setField = createEvent<FieldPair<T, keyof T>>()
  public readonly set = createEvent<T>()
  public readonly $store

  public readonly validate
  public readonly validateField
  private readonly setValidation = createEvent<ValidationList<T>>()
  private readonly setFieldValidation =
    createEvent<ValidationFieldPair<keyof T>>()
  public readonly $validation

  private readonly setIsValid = createEvent<boolean>()
  public readonly $isValid = createStore(true).on(
    this.setIsValid,
    (_, isValid) => isValid
  )

  private readonly fullValidation: ValidationList<T>
  public readonly fields: { [K in keyof T]: K }
  public readonly keysList
  private readonly schema: ObjectSchema<T> | null = null
  private isAutoValidated = false

  constructor(schema: T | ObjectSchema<T>) {
    const initialState: T = schema.__isYupSchema__
      ? schema.getDefault()
      : schema
    this.fullValidation = mapObject(initialState, () => valid)
    this.$store = createStore<T>(initialState)
      .on(this.setField, (store, { key, value }) => ({
        ...store,
        [key]: value,
      }))
      .on(this.set, (_, payload) => payload)

    this.$validation = createStore<Record<keyof T, ValidationState | null>>(
      mapObject(initialState, () => null)
    ).on(this.setFieldValidation, (store, { key, value }) => {
      const currentValidation = store[key]
      if (
        currentValidation === value ||
        currentValidation?.message === value.message
      ) {
        return
      }
      return { ...store, [key]: value }
    })

    this.validate = attach({
      source: this.$store,
      mapParams: (_: void, source) => source,
      effect: createEffect((source: T) => {
        if (!this.schema) {
          const result = validateWoSchema(source, initialState)
          this.setValidation(result.list)
          this.setIsValid(result.isValid)
          return result
        }
        return this.schema
          .validate(source)
          .then(() => {
            this.setIsValid(true)
            this.setValidation(this.fullValidation)
            return { list: this.fullValidation, isValid: true }
          })
          .catch((errorsList) => {
            const result = { ...this.fullValidation }
            errorsList.inner.forEach(({ path, message }: ValidationError) => {
              result[path as keyof T] = invalid(message)
            })
            this.setIsValid(false)
            this.setValidation(result)
            return { result, isValid: false }
          })
      }),
    })

    this.validateField = attach({
      source: {
        values: this.$store,
        validation: this.$validation,
        isValid: this.$isValid,
      },
      mapParams: (key: keyof T, { values, ...sources }) => ({
        field: { key, value: values[key] },
        ...sources,
      }),
      effect: createEffect(
        ({ field, isValid, validation }: ValidateFieldProps<T>) => {
          if (!this.schema) {
            return {}
          }
          this.schema
            .validateAt(field.key as string, { [field.key]: field.value })
            .then(() => {
              if (validation[field.key] === valid || isValid) {
                return { isValid, result: valid }
              }
              const fieldState: ValidationFieldPair<keyof T> = {
                key: field.key,
                value: valid,
              }
              const nextResult = mergeValidation(validation, fieldState)
              this.setFieldValidation(fieldState)
              this.setIsValid(nextResult.isValid)
              return { isValid: nextResult.isValid, result: valid }
            })
            .catch((e) => {
              const fieldState: ValidationFieldPair<keyof T> = {
                key: field.key,
                value: {
                  isValid: false,
                  message: e.message,
                },
              }
              const nextResult = mergeValidation(validation, fieldState)
              this.setFieldValidation(fieldState)
              this.setIsValid(nextResult.isValid)
              return fieldState
            })
        }
      ),
    })

    this.keysList = Object.keys(initialState) as (keyof T)[]
    this.fields = Object.fromEntries(
      this.keysList.map((key) => [key, key])
    ) as { [K in keyof T]: K }
  }

  public mapKeys<U>(fn: (value: keyof T) => U): U[] {
    return this.keysList.map(fn)
  }

  public autoValidate() {
    this.isAutoValidated = true
    this.setField.watch((params) => {
      if (!this.schema) return
      this.schema
        .validateAt(params.key as string, params)
        .then(() => {
          this.setFieldValidation({ key: params.key, value: valid })
        })
        .catch((e) => {
          this.setFieldValidation({
            key: params.key,
            value: { isValid: false, message: e.message },
          })
        })
    })
    return this
  }
}

export const createFormModel = <T extends Record<string, any>>(
  initialFormState: T | ObjectSchema<T>
) => {
  return new FormModel<T>(initialFormState)
}

export const useFormField = <T extends Record<string, any>, K extends keyof T>(
  form: FormModel<T>,
  key: K
) => {
  const fieldValue = useStoreMap({
    store: form.$store,
    keys: [key, form],
    fn: (fields) => fields[key],
  })

  const updateField = useCallback(
    (value: T[K]) => form.setField({ value, key }),
    [form, key]
  )

  return [fieldValue, updateField] as [T[K], (value: T[K]) => void]
}

export const useFieldValidation = <LT extends Record<string, any>>(
  form: FormModel<LT>,
  key: keyof LT
) => {
  return useStoreMap({
    store: form.$validation,
    keys: [key, form],
    fn: (fields) => fields[key],
  })
}

export const useSpecificTypeFormField = <LT extends Record<string, any>, T>(
  form: FormModel<LT>,
  name: keyof LT
) => {
  return useFormField(form, name) as [T, (value: T) => void]
}
