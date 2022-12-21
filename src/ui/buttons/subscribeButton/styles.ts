import { ColorThemes } from '../../../features/themed/theme'
import { LangStructure } from '../../../translations/types'
import { themedButtonPreset } from '../styles'

export enum SubscribeButtonState {
  NEGATIVE,
  POSITIVE,
}

const SUBSCRIBE_BUTTON_PRESETS = {
  [SubscribeButtonState.NEGATIVE]: {
    preset: (theme: ColorThemes) => themedButtonPreset(theme).WHITE,
    label: (text: LangStructure) => text.unfollow,
  },
  [SubscribeButtonState.POSITIVE]: {
    preset: (theme: ColorThemes) => themedButtonPreset(theme).COMMON,
    label: (text: LangStructure) => text.follow,
  },
}
type SubscribeButtonPresetProps = {
  theme: ColorThemes
  text: LangStructure
  state: SubscribeButtonState
}

export function getSubscribeButtonPreset({
  theme,
  text,
  state,
}: SubscribeButtonPresetProps) {
  const { preset, label } = SUBSCRIBE_BUTTON_PRESETS[state]
  return {
    label: label(text),
    preset: preset(theme),
  }
}
