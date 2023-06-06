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
  adjustLabel,
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

  const handlePress = () => {
    onPress?.()
    onUnderlayAction(false)
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
      onPress={handlePress}
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

        {label && (
          <Span
            weight={500}
            style={[buttonStyles.label, activeStyles.label, labelStyle]}
            label={label}
            adjustsFontSizeToFit={adjustLabel}
            minimumFontScale={adjustLabel ? 0.75 : undefined}
            numberOfLines={adjustLabel ? 1 : undefined}
          />
        )}
      </>
    </TouchableHighlight>
  )
}
