import { StyleSheet } from 'react-native'
import { defaultColors } from '../../features/themed/theme'
import { FONT_MEDIUM } from '../../styles/fonts'
import { DropdownStyles } from './types'

export const DEFAULT_DROPDOWN_HEIGHT = 200

export const styles = StyleSheet.create<DropdownStyles>({
  label: {
    marginBottom: 8,
  },
  wrapper: {
    flexGrow: 1,
  },
  tab: {
    width: '100%',
    paddingVertical: 16,
    paddingHorizontal: 20,
    paddingRight: 24,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: defaultColors.detailsInactive,
    backgroundColor: defaultColors.formFieldBackground,
  },
  activeTab: {
    borderColor: defaultColors.detailsActive,
    backgroundColor: '#ffffff',
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
