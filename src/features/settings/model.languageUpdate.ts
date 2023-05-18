import { sample } from 'effector'
import { createStateModel } from 'altek-toolkit'
import { languageModel } from '../../translations/model.languages'
import { Languages } from '../../translations/types'
import { categoriesListModel } from '../categories/model'
import { winnersListModel } from '../winners/request'

export const isLanguageSelectionFocused = createStateModel(false)

const prevLanguageRef: { current: null | Languages } = {
  current: null,
}
sample({
  source: languageModel.$state,
  clock: isLanguageSelectionFocused.set,
  fn: (language, isFocused) => ({ language, isFocused }),
}).watch(({ language, isFocused }) => {
  if (isFocused) {
    prevLanguageRef.current = language
    return
  }
  if (prevLanguageRef.current === language) return
  winnersListModel.getSync()
  categoriesListModel.getSync()
})
