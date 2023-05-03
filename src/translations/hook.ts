import { useStore } from 'effector-react'
import { TXT } from './Texts'
import { languageModel } from './model.languages'

export function useText() {
  const currentLanguage = useStore(languageModel.$state)
  return TXT[currentLanguage]
}

export function useLanguage() {
  return useStore(languageModel.$state)
}
