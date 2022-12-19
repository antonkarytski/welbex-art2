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
