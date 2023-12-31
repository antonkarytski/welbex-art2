import { StyleSheet } from 'react-native'
import { defaultColors } from '../../features/themed/theme'
import { FONT_MEDIUM } from '../../styles/fonts'

export const selectStyles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
    backgroundColor: '#fff',
  },
  item: {
    position: 'relative',
    paddingVertical: 20,
    paddingRight: 40,
  },
  item_label: {
    fontSize: 16,
    lineHeight: 21,
    fontFamily: FONT_MEDIUM,
    color: defaultColors.text,
  },
  item_label__selected: {
    color: defaultColors.textAccent,
  },
  icon_checkMark__wrapper: {
    position: 'absolute',
    zIndex: 3,
    elevation: 3,
    right: -20,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
})
