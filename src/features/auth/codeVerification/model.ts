import { createStateModel } from 'altek-toolkit'

export const isCodeValidModel = createStateModel(false)
export const codeModel = createStateModel('')

codeModel.$state.watch(async (code) => {
  if (code.length === 4) {
    // await... api request to check, if success ->
    isCodeValidModel.set(true)
  }
})
