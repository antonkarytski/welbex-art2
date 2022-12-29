import { Event, Store, createEvent, createStore } from 'effector'
import { useStoreMap } from 'effector-react'
import { useCallback } from 'react'

export type SetFieldPayload<T> = { key: keyof T; value: string }
export type FormModel<T extends Record<string, string>> = {
  setField: Event<SetFieldPayload<T>>
  $store: Store<T>
}

export type FormFieldComponentProps<T extends Record<string, string>> = {
  name: keyof T
  formModel: FormModel<T>
}

export const createFormModel = <T extends Record<string, string>>(
  initialFormState: T
): FormModel<T> => {
  const setField = createEvent<SetFieldPayload<T>>()
  const $store = createStore<T>(initialFormState).on(
    setField,
    (store, { key, value }) => ({
      ...store,
      [key]: value,
    })
  )

  return {
    setField,
    $store,
  }
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
