import { useStore } from 'effector-react'
import { languageModel } from './model'
import { TXT } from './Texts'

export function useText() {
	const currentLanguage = useStore(languageModel.$state)
	return TXT[currentLanguage]
}