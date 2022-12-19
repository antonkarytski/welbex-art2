import { StyleSheet } from 'react-native'
import { createThemedPreset } from '../../features/themed/createThemedStyles'

export enum ButtonPresetName {
  COMMON = 'COMMON',
  WHITE = 'WHITE',
}

export type Preset = {
  background: string
  label: string
  border?: string
}
export type ButtonStatesPreset = {
  common: Preset
  active: Preset
  disabled?: Preset
}
export const BUTTON_THEMED_PRESET = createThemedPreset<
  Record<ButtonPresetName, ButtonStatesPreset>
>((colors) => {
  return {
    [ButtonPresetName.WHITE]: {
      common: {
        background: colors.whiteButton,
        label: colors.whiteButtonElements,
        border: colors.whiteButtonElements,
      },
      active: {
        background: colors.whiteButtonPressed,
        label: colors.whiteButtonPressedElements,
        border: colors.whiteButtonPressedElements,
      },
      disabled: {
        background: colors.whiteButton,
        label: colors.whiteButtonDisabledElements,
        border: colors.whiteButtonDisabledElements,
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
