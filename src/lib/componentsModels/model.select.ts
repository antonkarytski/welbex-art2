import { createEvent, restore } from 'effector'
import { StateModel } from 'altek-toolkit'

export type SelectedItemId = string | number | null
export type SelectModel = StateModel<SelectedItemId>

export const createSelectModel = () => {
  const setSelectedItemId = createEvent<SelectedItemId>()

  const $selectStore = restore(setSelectedItemId, null)

  const selectModel: SelectModel = {
    $state: $selectStore,
    set: setSelectedItemId,
  }

  return selectModel
}
