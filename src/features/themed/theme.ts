import { COLORS } from 'altek-ui'
import { COMMON } from '../../styles/colors'

export type ColorThemeStructure = Record<keyof typeof LIGHT, string>
export enum ColorThemes {
  LIGHT = 'LIGHT',
  DARK = 'DARK',
}
export type ColorFn = (structure: ColorThemeStructure) => string

const LIGHT = {
  text: '#303535',
  subText: '#B2BEBD',
  screenBackground: '#FFFFFF',
  primary1: '#347B81',
  primary2: '#84BDBE',
  primary3: '#B4DCD8',
  navigationLabelSelected: '#FFFFFF',
  card: '#FFFFFF',
  shadow: '#1F1F1F1F',
}

const DARK: Record<keyof ColorThemeStructure, string> = {
  text: '#303535',
  subText: '#B2BEBD',
  screenBackground: '#FFFFFF',
  primary1: '#347B81',
  primary2: '#84BDBE',
  primary3: '#B4DCD8',
  navigationLabelSelected: '#FFFFFF',
  card: '#FFFFFF',
  shadow: '#1F1F1F1F',
}

export const COLOR_THEMES: Record<ColorThemes, ColorThemeStructure> = {
  LIGHT,
  DARK,
}
