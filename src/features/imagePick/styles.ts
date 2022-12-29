import { StyleSheet } from 'react-native'
import { themedShadow5Style } from '../../styles/shadows'
import { createSingleThemedStyle } from '../themed'

export const uploadImageCardThemedStyle = createSingleThemedStyle((colors) => ({
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'center',
  backgroundColor: colors.screenBackground,
  borderRadius: 20,
  padding: 12,
}))

export const shadowCardThemedStyle = createSingleThemedStyle((colors) => ({
  ...uploadImageCardThemedStyle(colors),
  ...themedShadow5Style(colors),
}))

export const uploadBlockCommonStyles = StyleSheet.create({
  button: {
    height: 100,
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  textBlock: {
    flex: 1,
    marginLeft: 20,
  },
})
