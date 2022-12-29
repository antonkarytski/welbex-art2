import { StyleSheet } from 'react-native'
import { createThemedPreset } from '../../features/themed/createThemedStyles'
import { PresetButtonStates } from './types'

export enum ButtonPresetName {
  COMMON = 'COMMON',
  WHITE = 'WHITE',
}

export const themedButtonPreset = createThemedPreset<
  Record<ButtonPresetName, PresetButtonStates>
>((colors) => {
  return {
    [ButtonPresetName.WHITE]: {
      common: {
        background: colors.buttonLightBackground,
        label: colors.buttonLightText,
        border: colors.buttonLightBorder,
      },
      active: {
        background: colors.buttonLightBackgroundPressed,
        label: colors.buttonLightTextPressed,
        border: colors.buttonLightBorderPressed,
      },
      disabled: {
        background: colors.buttonLightBackgroundDisabled,
        label: colors.buttonLightTextDisabled,
        border: colors.buttonLightBorderDisabled,
      },
    },
    [ButtonPresetName.COMMON]: {
      common: {
        background: colors.button,
        label: colors.buttonLabel,
      },
      active: {
        background: colors.buttonPressed,
        label: colors.buttonLabel,
      },
      disabled: {
        background: colors.buttonDisabled,
        label: colors.buttonDisabledLabel,
      },
    },
  }
})

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
