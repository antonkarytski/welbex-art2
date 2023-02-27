import { createThemedPreset } from '../features/themed/createThemedStyles'
import { useThemedStyleList } from '../features/themed/hooks'
import { PresetSelectItemStates } from '../ui/selects/selectItem/styles.preset'
import { dropdownTabThemedPreset } from './dropdownTab'

export const selectItemThemedPreset =
  createThemedPreset<PresetSelectItemStates>((colors) => ({
    common: {
      item: colors.selectItemBackground,
      itemLabel: colors.text,
    },
    selected: {
      item: colors.selectCkeckedItemBackground,
      itemLabel: colors.textAccent,
    },
  }))

export const useDropdownSelectPreset = () => {
  const { styles } = useThemedStyleList({
    dropdownTab: dropdownTabThemedPreset,
    selectItem: selectItemThemedPreset,
  })
  return styles
}
