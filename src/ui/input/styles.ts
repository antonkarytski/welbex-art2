import { StyleSheet } from 'react-native'
import { COLOR_THEMES } from '../../features/themed/theme'
import * as FONTS from '../../styles/fonts'

const defaultColors = COLOR_THEMES.LIGHT

export const placeholderColor = defaultColors.placeholder

export const INPUT_HEIGHT = 52
export const inputStyles = StyleSheet.create({
  wrapper: {
    flexGrow: 1,
  },
  inputWrapper: {
    width: '100%',
    position: 'relative',
    zIndex: 2,
    elevation: 2,
  },
  input__pseudoBefore: {
    paddingLeft: 54,
  },
  input__pseudoAfter: {
    paddingRight: 52,
  },
  inputPseudo: {
    position: 'absolute',
    height: '100%',
    justifyContent: 'center',
    zIndex: 2,
    elevation: 2,
  },
  pseudoBefore: {
    left: 22,
  },
  pseudoAfter: {
    right: 22,
  },
  label: {
    marginBottom: 8,
    color: defaultColors.inputTitle,
    fontSize: 14,
    fontFamily: FONTS.FONT_MEDIUM,
  },
  input: {
    backgroundColor: defaultColors.inputBackground,
    borderRadius: 8,
    paddingVertical: 16,
    paddingHorizontal: 20,
    color: defaultColors.text,
    fontSize: 16,
    fontFamily: FONTS.FONT_MEDIUM,
    lineHeight: 19,
  },
  border: {
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: defaultColors.inputBorder,
  },
  input__focused: {
    borderColor: defaultColors.inputFocusedBorder,
    backgroundColor: defaultColors.inputFocusedBackground,
  },
  input__invalid: {
    borderColor: defaultColors.errorBorder,
  },
  input__valid: {
    borderColor: defaultColors.successBorder,
  },
  input__disabled: {
    backgroundColor: defaultColors.inputDisabledBackground,
  },
})
