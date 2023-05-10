import { StyleSheet } from 'react-native'
import { defaultColors } from '../../features/themed/theme'
import { FONT_MEDIUM } from '../../styles/fonts'
import { DropdownStyles } from './types'

export const DEFAULT_DROPDOWN_HEIGHT = 200

export const dropdownStyles = StyleSheet.create<DropdownStyles>({
  label: {
    marginBottom: 8,
    fontSize: 14,
    lineHeight: 20,
    fontFamily: FONT_MEDIUM,
  },
  wrapper: {
    flexGrow: 1,
  },
  tab: {
    width: '100%',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingRight: 24,
    borderWidth: 1,
    borderRadius: 8,
    height: 52,
    borderColor: defaultColors.detailsInactive,
    backgroundColor: defaultColors.formFieldBackground,
  },
  tabLabel: {
    marginRight: 10,
    fontSize: 16,
    lineHeight: 21,
    fontFamily: FONT_MEDIUM,
    textAlignVertical: 'center',
    color: defaultColors.text,
  },
  tabInnerWrapper: {
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  toggleIcon__opened: {
    transform: [{ rotate: '180deg' }],
  },
})
