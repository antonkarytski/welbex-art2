import {
  BLACK,
  COMMON,
  GREEN,
  GREEN_BLUE,
  GREY,
  RED,
} from '../../styles/colors'

export type ColorThemeStructure = Record<keyof typeof LIGHT, string>
export enum ColorThemes {
  LIGHT = 'LIGHT',
  DARK = 'DARK',
}
export type ColorFn = (structure: ColorThemeStructure) => string

const LIGHT = {
  whiteText: '#FFFFFF',
  text: '#303535',
  subText: '#B2BEBD',
  lightText: '#757575',
  button: '#4B9DA4',
  button2: '#46949B',
  buttonPressed: '#347B81',
  buttonDisabled: '#F2F4F4',
  buttonLabel: '#FFFFFF',
  buttonDisabledLabel: '#B2BEBD',
  whiteButton: '#FFFFFF',
  whiteButtonElements: '#303535',
  whiteButtonPressed: '#F9FAF9',
  whiteButtonPressedElements: '#347B81',
  whiteButtonDisabledElements: '#B2BEBD',
  primary1: '#347B81',
  primary2: '#84BDBE',
  primary3: '#B4DCD8',
  navigationLabelSelected: '#FFFFFF',
  card: '#FFFFFF',
  shadow: 'rgba(31,31,31,0.51)',
  line: '#F2F4F4',
  darkLine: '#D5DDDC',
  icon: '#616868',
  tabsLine: '#DDDDDD',
  tabsSelectedTint: '#242424',
  /** Common */
  appHeaderTextLight: COMMON.WHITE,
  appHeaderBorderLight: GREEN_BLUE.MEDIUM_LIGHT,
  appHeaderTextDark: BLACK.TEXT,
  appHeaderBorderDark: GREY.DETAILS,
  textAccent: GREEN_BLUE.PRIMARY,
  textLight: GREY.TEXT_LIGHT,
  screenBackground: COMMON.WHITE,
  screenBackgroundAccent: GREEN_BLUE.BODY_GRADIENT,
  modalOverlay: GREY.MODAL_OVERLAY,
  scrollBarThumb: GREY.DETAILS,
  /** Main navigation */
  navBarBackground: GREEN_BLUE.NAV_BAR_GRADIENT,
  navBarText: GREEN_BLUE.LIGHT,
  navBarTextActive: COMMON.WHITE,
  /** Screen navigation */
  screenNavTextInactive: GREY.TEXT_LIGHT,
  /** Validation error */
  errorText: RED.TEXT,
  errorBorder: RED.BORDER,
  errorBackground: RED.BACKGROUND,
  /** Validation success */
  successIcon: GREEN.TEXT,
  successText: GREEN.TEXT,
  successBorder: GREEN_BLUE.PRIMARY,
  /** Primary button */
  buttonText: COMMON.WHITE,
  buttonTextDisabled: GREY.TEXT_LIGHT,
  buttonBackground: GREEN_BLUE.BUTTON_BACKGROUND_GRADIENT,
  buttonBackgroundPressed: GREEN_BLUE.PRIMARY,
  buttonBackgroundDisabled: GREY.BACKGROUND_DISABLED,
  /** Secondary button */
  buttonLightText: BLACK.TEXT,
  buttonLightTextPressed: GREEN_BLUE.PRIMARY,
  buttonLightBackground: COMMON.WHITE,
  buttonLightBackgroundPressed: GREY.BACKGROUND_EXTRA_LIGHT,
  buttonLightBorder: BLACK.TEXT,
  buttonLightBorderDisabled: GREY.TEXT_LIGHT,
  /** Inputs */
  placeholder: GREY.TEXT_LIGHT,
  inputTitle: GREY.TEXT,
  inputBorder: GREY.DETAILS,
  inputBackground: GREY.BACKGROUND_EXTRA_LIGHT,
  inputFocusedBackground: COMMON.WHITE,
  inputFocusedBorder: GREEN_BLUE.PRIMARY,
  inputDisabledText: GREY.TEXT_LIGHT,
  inputDisabledBackground: GREY.BACKGROUND_DISABLED,
  inputCheckedBackground: COMMON.WHITE,
  inputCheckedBackgroundActive: GREEN_BLUE.PRIMARY,
  switchBackgroundInactive: GREY.DETAILS,
}

const DARK: Record<keyof ColorThemeStructure, string> = {
  whiteText: '#FFFFFF',
  text: '#303535',
  subText: '#B2BEBD',
  lightText: '#757575',
  button: '#4B9DA4',
  button2: '#46949B',
  buttonPressed: '#347B81',
  buttonDisabled: '#F2F4F4',
  buttonLabel: '#FFFFFF',
  buttonDisabledLabel: '#B2BEBD',
  whiteButton: '#FFFFFF',
  whiteButtonElements: '#303535',
  whiteButtonPressed: '#F9FAF9',
  whiteButtonPressedElements: '#347B81',
  whiteButtonDisabledElements: '#B2BEBD',
  primary1: '#347B81',
  primary2: '#84BDBE',
  primary3: '#B4DCD8',
  navigationLabelSelected: '#FFFFFF',
  card: '#FFFFFF',
  shadow: '#1F1F1F1F',
  line: '#F2F4F4',
  darkLine: '#D5DDDC',
  icon: '#616868',
  tabsLine: '#DDDDDD',
  tabsSelectedTint: '#242424',
  /** Common */
  appHeaderTextLight: COMMON.WHITE,
  appHeaderBorderLight: GREEN_BLUE.MEDIUM_LIGHT,
  appHeaderTextDark: BLACK.TEXT,
  appHeaderBorderDark: GREY.DETAILS,
  textAccent: GREEN_BLUE.PRIMARY,
  textLight: GREY.TEXT_LIGHT,
  screenBackground: COMMON.WHITE,
  screenBackgroundAccent: GREEN_BLUE.BODY_GRADIENT,
  modalOverlay: GREY.MODAL_OVERLAY,
  scrollBarThumb: GREY.DETAILS,
  /** Main navigation */
  navBarBackground: GREEN_BLUE.NAV_BAR_GRADIENT,
  navBarText: GREEN_BLUE.LIGHT,
  navBarTextActive: COMMON.WHITE,
  /** Screen navigation */
  screenNavTextInactive: GREY.TEXT_LIGHT,
  /** Validation error */
  errorText: RED.TEXT,
  errorBorder: RED.BORDER,
  errorBackground: RED.BACKGROUND,
  /** Validation success */
  successIcon: GREEN.TEXT,
  successText: GREEN.TEXT,
  successBorder: GREEN_BLUE.PRIMARY,
  /** Primary button */
  buttonText: COMMON.WHITE,
  buttonTextDisabled: GREY.TEXT_LIGHT,
  buttonBackground: GREEN_BLUE.BUTTON_BACKGROUND_GRADIENT,
  buttonBackgroundPressed: GREEN_BLUE.PRIMARY,
  buttonBackgroundDisabled: GREY.BACKGROUND_DISABLED,
  /** Secondary button */
  buttonLightText: BLACK.TEXT,
  buttonLightTextPressed: GREEN_BLUE.PRIMARY,
  buttonLightBackground: COMMON.WHITE,
  buttonLightBackgroundPressed: GREY.BACKGROUND_EXTRA_LIGHT,
  buttonLightBorder: BLACK.TEXT,
  buttonLightBorderDisabled: GREY.TEXT_LIGHT,
  /** Inputs */
  placeholder: GREY.TEXT_LIGHT,
  inputTitle: GREY.TEXT,
  inputBorder: GREY.DETAILS,
  inputBackground: GREY.BACKGROUND_EXTRA_LIGHT,
  inputFocusedBackground: COMMON.WHITE,
  inputFocusedBorder: GREEN_BLUE.PRIMARY,
  inputDisabledText: GREY.TEXT_LIGHT,
  inputDisabledBackground: GREY.BACKGROUND_DISABLED,
  inputCheckedBackground: COMMON.WHITE,
  inputCheckedBackgroundActive: GREEN_BLUE.PRIMARY,
  switchBackgroundInactive: GREY.DETAILS,
}

export const COLOR_THEMES: Record<ColorThemes, ColorThemeStructure> = {
  LIGHT,
  DARK,
}
