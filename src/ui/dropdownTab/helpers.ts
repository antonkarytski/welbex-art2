import { Dimensions, ViewStyle } from 'react-native'
import { DEFAULT_DROPDOWN_HEIGHT } from './styles'

const { height } = Dimensions.get('window')
const DROPDOWN_MAX_HEIGHT = height * 0.5

export const calculateDropdownHeight = (dropdownStyle?: ViewStyle) => {
  const customHeight =
    typeof dropdownStyle?.height === 'number'
      ? dropdownStyle.height
      : DEFAULT_DROPDOWN_HEIGHT
  return customHeight < DROPDOWN_MAX_HEIGHT ? customHeight : DROPDOWN_MAX_HEIGHT
}
