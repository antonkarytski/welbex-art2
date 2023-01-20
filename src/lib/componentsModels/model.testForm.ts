import { createEvent, createStore } from 'effector'
import { useStoreMap } from 'effector-react'
import { useCallback } from 'react'

export type SetFieldPayload<T, F> = { key: keyof T; value: F }

export type FormFieldComponentProps<F, T extends Record<string, F>> = {
  name: keyof T
  formModel: FormModel<F, T>
}

export class FormModel<F, T extends Record<string, F>> {
  public readonly setField = createEvent<SetFieldPayload<T, F>>()
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

export const createFormModel = <F, T extends Record<string, F>>(
  initialFormState: T
) => {
  return new FormModel<F, T>(initialFormState)
}

export const useFormField = <F, T extends Record<string, F>>(
  form: FormModel<F, T>,
  key: keyof T
) => {
  const fieldValue = useStoreMap({
    store: form.$store,
    keys: [key, form],
    fn: (fields) => fields[key] || '',
  })

  const updateField = useCallback(
    (value: F) => form.setField({ value, key }),
    [form, key]
  )

  return [fieldValue, updateField] as [F, (value: F) => void]
}
