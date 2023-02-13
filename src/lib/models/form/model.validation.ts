import {
  Store,
  createEffect,
  createEvent,
  createStore,
  restore,
} from 'effector'
import { attach } from 'effector/effector.cjs'
import { ObjectSchema, ValidationError } from 'yup'
import { mapObject } from '../../helpers/array'
import { invalid, mergeValidation, valid, validateWoSchema } from './helpers'
import {
  ListValidationResult,
  SingleValidationResult,
  ValidateFieldProps,
  ValidationFieldPair,
  ValidationList,
  ValidationState,
} from './types'

export function createValidator<T extends Record<string, any>>(
  schema: T | ObjectSchema<T>,
  $values: Store<T>
) {
  const yupSchema = schema.__isYupSchema__ ? schema : null
  const initialState: T = schema.__isYupSchema__ ? schema.getDefault() : schema
  const fullValidation = mapObject(initialState, () => valid)

  const setIsValid = createEvent<boolean | null>()
  const $isValid = restore(setIsValid, true)

  const set = createEvent<ValidationList<T>>()
  const setFieldValidation = createEvent<ValidationFieldPair<keyof T>>()

  const $fields = createStore<Record<keyof T, ValidationState | null>>(
    mapObject(initialState, () => null)
  ).on(setFieldValidation, (store, { key, value }) => {
    const currentValidation = store[key]
    if (
      currentValidation === value ||
      currentValidation?.message === value.message
    ) {
      return
    }
    return { ...store, [key]: value }
  })

  function updateFieldsValidation(result: ListValidationResult<T>) {
    set(result.list)
    setIsValid(result.isValid)
    return result
  }

  function updateSingleValidation(
    current: Record<keyof T, ValidationState | null>,
    key: keyof T,
    value: ValidationState
  ) {
    const fieldState: ValidationFieldPair<keyof T> = { key, value }
    const nextResult = mergeValidation(current, fieldState)
    setFieldValidation(fieldState)
    setIsValid(nextResult.isValid)
    return { isValid: nextResult.isValid, result: valid }
  }

  const cast = attach({
    source: $values,
    mapParams: (_: void, source) => source,
    effect: createEffect((source: T): ListValidationResult<T> => {
      if (!yupSchema) {
        const result = validateWoSchema(source, initialState)
        return updateFieldsValidation(result)
      }
      return schema
        .validate(source)
        .then(() => {
          return updateFieldsValidation({ list: fullValidation, isValid: true })
        })
        .catch((errorsList: any) => {
          const list = { ...fullValidation }
          errorsList.inner.forEach(({ path, message }: ValidationError) => {
            list[path as keyof T] = invalid(message)
          })
          return updateFieldsValidation({ list, isValid: false })
        })
    }),
  })

  const castField = attach({
    source: {
      values: $values,
      validation: $fields,
      isValid: $isValid,
    },
    mapParams: (key: keyof T, { values, ...sources }) => ({
      field: { key, value: values[key] },
      ...sources,
    }),
    effect: createEffect(
      ({
        field,
        isValid,
        validation,
      }: ValidateFieldProps<T>): SingleValidationResult => {
        if (!schema) {
          return { isValid, result: valid }
        }
        return schema
          .validateAt(field.key as string, { [field.key]: field.value })
          .then(() => {
            if (validation[field.key] === valid || isValid) {
              return { isValid, result: valid }
            }
            return updateSingleValidation(validation, field.key, valid)
          })
          .catch((e: any) => {
            return updateSingleValidation(
              validation,
              field.key,
              invalid(e.message)
            )
          })
      }
    ),
  })

  return { $fields, cast, $isValid, castField }
}
