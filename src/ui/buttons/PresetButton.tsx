import React, { useEffect, useMemo, useState } from 'react'
import { StyleSheet, TouchableHighlight } from 'react-native'
import Span from '../Span'
import { buttonStyles, defaultButtonPreset } from './styles'
import { PresetButtonProps } from './types'

export default function PresetButton({
  onPress,
  children,
  disabled,
  preset = defaultButtonPreset,
  style,
  label,
  labelStyle,
  disabledStyle,
}: PresetButtonProps) {
  const [presetState, setPresetState] = useState(preset.common)

  const activeStyles = useMemo(
    () =>
      StyleSheet.create({
        button: {
          backgroundColor: presetState.background,
          borderColor: presetState.border ?? 'transparent',
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
      <>
        {children && typeof children === 'function'
          ? children(presetState)
          : null}

        {children &&
        typeof children !== 'string' &&
        typeof children !== 'function'
          ? children
          : null}

        {(label ?? (children && typeof children === 'string')) && (
          <Span
            weight={500}
            style={[buttonStyles.label, activeStyles.label, labelStyle]}
            label={typeof children === 'string' ? children : label}
          />
        )}
      </>
    </TouchableHighlight>
  )
}
