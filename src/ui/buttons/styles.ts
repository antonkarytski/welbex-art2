import { StyleSheet } from 'react-native'
import { BLACK, COMMON, GREEN_BLUE, GREY } from '../../styles/colors'
import { PresetButtonStates } from './types'

export const defaultButtonPreset: PresetButtonStates = {
  common: {
    background: COMMON.WHITE,
    label: BLACK.TEXT,
    border: BLACK.TEXT,
  },
  active: {
    background: GREY.BACKGROUND_EXTRA_LIGHT,
    label: GREEN_BLUE.PRIMARY,
    border: GREEN_BLUE.PRIMARY,
  },
  disabled: {
    background: COMMON.WHITE,
    label: GREY.TEXT_LIGHT,
    border: GREY.TEXT_LIGHT,
  },
}

export const buttonStyles = StyleSheet.create({
  button: {
    width: '100%',
    borderRadius: 32,
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  label: {
    fontSize: 16,
    lineHeight: 21,
  },
})
