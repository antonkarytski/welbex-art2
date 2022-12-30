import { StyleSheet } from 'react-native'
import { DropdownStyles } from './types'

export const DEFAULT_DROPDOWN_HEIGHT = 200

export const dropdownStyles = StyleSheet.create<DropdownStyles>({
  label: {
    marginBottom: 8,
  },
  wrapper: {
    width: '100%',
  },
  tab: {
    width: '100%',
    paddingVertical: 16,
    paddingHorizontal: 20,
    paddingRight: 24,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#347B81',
    backgroundColor: '#ffffff',
  },
  tabLabel: {
    marginRight: 10,
  },
  tabInnerWrapper: {
    justifyContent: 'space-between',
  },
  toggleIcon__opened: {
    transform: [{ rotate: '180deg' }],
  },
})
