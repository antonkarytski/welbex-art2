import { useEffect, useMemo, useState } from 'react'
import { StyleSheet } from 'react-native'
import { defaultColors } from '../../features/themed/theme'

export type DropdownTabPreset = {
  label?: string
  tabLabel?: string
  tabBorder?: string
  tabBackground?: string
  icon?: string
}

export type PresetDropdownTabStates = {
  common: DropdownTabPreset
  opened: DropdownTabPreset
}

export const defaultDropdownTabPreset: PresetDropdownTabStates = {
  common: {
    label: defaultColors.text,
    tabLabel: defaultColors.text,
    icon: defaultColors.text,
    tabBorder: defaultColors.inputBorder,
    tabBackground: defaultColors.inputBackground,
  },
  opened: {
    label: defaultColors.text,
    tabLabel: defaultColors.text,
    icon: defaultColors.textAccent,
    tabBorder: defaultColors.inputFocusedBorder,
    tabBackground: defaultColors.inputFocusedBackground,
  },
}

type UseDropdownTabPresetProps = {
  preset?: PresetDropdownTabStates
  isOpened?: boolean
}

export const useDropdownTabPreset = ({
  preset,
  isOpened,
}: UseDropdownTabPresetProps) => {
  const [presetState, setPresetState] = useState(preset?.common)

  const activeStyles = useMemo(
    () =>
      StyleSheet.create({
        label: { color: presetState?.label },
        tabLabel: { color: presetState?.tabLabel },
        tab: {
          borderColor: presetState?.tabBorder,
          backgroundColor: presetState?.tabBackground,
        },
      }),
    [presetState]
  )

  useEffect(() => {
    if (isOpened && preset?.opened) return setPresetState(preset.opened)

    setPresetState(preset?.common)
  }, [isOpened, preset])

  return { ...activeStyles, iconColor: presetState?.icon }
}
