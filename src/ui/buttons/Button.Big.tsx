import React, { useEffect, useMemo, useState } from 'react'
import {
  StyleProp,
  StyleSheet,
  TextStyle,
  TouchableHighlight,
  ViewStyle,
} from 'react-native'
import { ColorThemes } from '../../features/themed/theme'
import { Fn, NodeFn } from '../../types'
import Span from '../Span'
import {
  BUTTON_THEMED_PRESET,
  ButtonPresetName,
  ButtonStatesPreset,
  Preset,
  buttonStyles,
} from './styles'

export type ButtonBigProps = {
  onPress: Fn
  label?: string
  disabled?: boolean
  preset?: ButtonStatesPreset
  style?: StyleProp<ViewStyle>
  disabledStyle?: StyleProp<ViewStyle>
  labelStyle?: StyleProp<TextStyle>
  children?: NodeFn<Preset>
}

export default function ButtonBig({
  onPress,
  children,
  disabled,
  preset = BUTTON_THEMED_PRESET(ColorThemes.LIGHT)[ButtonPresetName.WHITE],
  style,
  label,
  labelStyle,
  disabledStyle,
}: ButtonBigProps) {
  const [presetState, setPresetState] = useState(preset.common)

  const activeStyles = useMemo(
    () =>
      StyleSheet.create({
        button: {
          backgroundColor: presetState.background,
          borderColor: presetState.border,
        },
        label: {
          color: presetState.label,
        },
      }),
    [presetState]
  )

  const onUnderlayAction = (isPressed: boolean) => {
    if (disabled) return
    if (isPressed) return setPresetState(preset.active)
    setPresetState(preset.common)
  }

  useEffect(() => {
    if (disabled && preset.disabled) return setPresetState(preset.disabled)
    setPresetState(preset.common)
  }, [disabled, preset])

  return (
    <TouchableHighlight
      disabled={disabled}
      underlayColor={preset.active.background}
      onShowUnderlay={() => onUnderlayAction(true)}
      onHideUnderlay={() => onUnderlayAction(false)}
      onPress={onPress}
      style={[
        buttonStyles.button,
        activeStyles.button,
        style,
        disabled && disabledStyle,
      ]}
    >
      {children ? (
        children(presetState)
      ) : (
        <Span
          weight={500}
          style={[buttonStyles.label, activeStyles.label, labelStyle]}
          label={label}
        />
      )}
    </TouchableHighlight>
  )
}
