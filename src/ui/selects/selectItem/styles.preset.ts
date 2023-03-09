import { useEffect, useMemo, useState } from 'react'
import { StyleSheet } from 'react-native'
import { defaultColors } from '../../../features/themed/theme'

type SelectItemPreset = {
  item?: string
  itemLabel?: string
}

export type PresetSelectItemStates = {
  common?: SelectItemPreset
  selected?: SelectItemPreset
}

export const defaultSelectItemPreset: PresetSelectItemStates = {
  common: {
    itemLabel: defaultColors.text,
  },
  selected: {
    itemLabel: defaultColors.textAccent,
  },
}

type UseSelectItemPresetProps = {
  preset?: PresetSelectItemStates
  isSelected?: boolean
}

export const useSelectItemPreset = ({
  preset,
  isSelected,
}: UseSelectItemPresetProps) => {
  const [presetState, setPresetState] = useState(preset?.common)

  const activeStyles = useMemo(
    () =>
      StyleSheet.create({
        item: { backgroundColor: presetState?.item },
        itemLabel: { color: presetState?.itemLabel },
      }),
    [presetState]
  )

  useEffect(() => {
    if (isSelected && preset?.selected) return setPresetState(preset.selected)

    setPresetState(preset?.common)
  }, [isSelected, preset])

  return activeStyles
}
