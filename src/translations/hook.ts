import { useStore } from 'effector-react'
import { TXT } from './Texts'
import { languageModel } from './model'

export function useText() {
  const currentLanguage = useStore(languageModel.$state)
  return TXT[currentLanguage]
}
