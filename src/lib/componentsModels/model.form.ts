import { createEvent, createStore } from 'effector'
import { useStoreMap } from 'effector-react'
import { useCallback } from 'react'

export type SetFieldPayload<T> = { key: keyof T; value: string }

export type FormFieldComponentProps<T extends Record<string, string>> = {
  name: keyof T
  formModel: FormModel<T>
}

export class FormModel<T extends Record<string, string>> {
  public readonly setField = createEvent<SetFieldPayload<T>>()
  public readonly $store
  public readonly fields: { [K in keyof T]: K }

  constructor(initialFormState: T) {
    this.$store = createStore<T>(initialFormState).on(
      this.setField,
      (store, { key, value }) => ({
        ...store,
        [key]: value,
      })
    )

    this.fields = Object.fromEntries(
      Object.keys(initialFormState).map((key) => [key, key])
    ) as { [K in keyof T]: K }
  }
}

export const createFormModel = <T extends Record<string, string>>(
  initialFormState: T
) => {
  return new FormModel<T>(initialFormState)
}

export const useFormField = <T extends Record<string, string>>(
  form: FormModel<T>,
  key: keyof T
) => {
  const fieldValue = useStoreMap({
    store: form.$store,
    keys: [key, form],
    fn: (fields) => fields[key] || '',
  })

  const updateField = useCallback(
    (value: string) => form.setField({ value, key }),
    [form, key]
  )

  return [fieldValue, updateField] as [string, (value: string) => void]
}
