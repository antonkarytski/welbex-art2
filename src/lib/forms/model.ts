import { createEvent, createStore } from 'effector'

export const createFormModel = <T extends Record<string, string>>(
  initialFormState: T
) => {
  type SetFieldPayload = { key: keyof T; value: string }
  const setField = createEvent<SetFieldPayload>()
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
