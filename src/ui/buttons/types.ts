export type Preset = {
  background: string
  label: string
  border?: string
}

export type PresetButtonStates = {
  common: Preset
  active: Preset
  disabled?: Preset
}
