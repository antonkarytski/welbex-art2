import { useStore } from 'effector-react'
import { PopUpModel } from './model'

export function usePopUpModel<T>(model: PopUpModel<T>) {
  const props = useStore(model.$props)
  return { props }
}
