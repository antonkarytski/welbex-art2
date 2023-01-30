import React, { PropsWithChildren, useEffect, useMemo, useState } from 'react'
import {
  StyleProp,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native'
import { defaultColors } from '../../features/themed/theme'
import Span from '../Span'
import OkIcon from '../icons/Icon.Ok'
import { defaultCheckboxPreset } from './styles'
import { PresetCheckboxStates } from './types'

type CheckboxProps = PropsWithChildren<{
  label?: string
  iconSize?: number
  iconColor?: string
  isSelected: boolean
  isInvalid?: boolean
  onSelect?: (state: boolean) => void
  style?: {
    container?: StyleProp<ViewStyle>
    checkbox?: StyleProp<ViewStyle>
    label?: StyleProp<TextStyle>
  }
  preset?: PresetCheckboxStates
}>

const Checkbox = ({
  label = '',
  children,
  iconSize = 12,
  iconColor,
  onSelect,
  isSelected,
  isInvalid,
  style,
  preset = defaultCheckboxPreset,
}: CheckboxProps) => {
  const [presetState, setPresetState] = useState(preset.common)

  const activeStyles = useMemo(
    () =>
      StyleSheet.create({
        checkbox: {
          backgroundColor: presetState?.checkboxBackground,
          borderColor: presetState?.checkboxBorder,
        },
        label: {
          color: presetState?.label,
        },
      }),
    [presetState]
  )

  useEffect(() => {
    if (isInvalid && preset.invalid) return setPresetState(preset.invalid)
    if (isSelected && preset.selected) return setPresetState(preset.selected)

    setPresetState(preset.common)
  }, [isInvalid, isSelected, preset])

  return (
    <TouchableOpacity
      style={[styles.container, style?.container]}
      onPress={() => onSelect?.(!isSelected)}
      activeOpacity={onSelect ? 0.7 : 1}
    >
      <View style={[styles.checkbox, activeStyles.checkbox, style?.checkbox]}>
        {isSelected && (
          <OkIcon size={iconSize} color={presetState?.icon || iconColor} />
        )}
      </View>
      {children ||
        (label && (
          <Span
            label={label}
            style={[styles.label, activeStyles.label, style?.label]}
            weight={500}
          />
        ))}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  label: {
    marginLeft: 12,
  },
  checkbox: {
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 2,
    borderWidth: 1,
    borderColor: defaultColors.checkboxBorder,
    backgroundColor: defaultColors.checkboxBackground,
  },
})

export default Checkbox
