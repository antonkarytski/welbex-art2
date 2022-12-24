import { Event, Store, createEvent, createStore } from 'effector'

type SetFieldPayload<T> = { key: keyof T; value: string }
type FormModel<T extends Record<string, string>> = {
  setField: Event<SetFieldPayload<T>>
  $store: Store<T>
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
