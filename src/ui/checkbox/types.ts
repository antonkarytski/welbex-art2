export type Preset = {
  checkboxBorder?: string
  checkboxBackground?: string
  label?: string
  icon?: string
}

export type PresetCheckboxStates = {
  common: Preset
  selected: Preset
  invalid?: Preset
}
