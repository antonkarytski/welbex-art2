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
export type ColorFn<R = string> = (structure: ColorThemeStructure) => R

const LIGHT = {
  whiteText: '#FFFFFF',
  text: '#303535',
  subText: '#B2BEBD',
  tipText: '#616868',
  lightText: '#757575',
  button: '#4B9DA4',
  button2: '#46949B',
  buttonPressed: '#347B81',
  buttonDisabled: '#F2F4F4',
  buttonLabel: '#FFFFFF',
  buttonDisabledLabel: '#B2BEBD',
  primary1: '#347B81',
  primary2: '#84BDBE',
  primary3: '#B4DCD8',
  navigationLabelSelected: '#FFFFFF',
  card: '#FFFFFF',
  shadow: 'rgba(31,31,31,0.51)',
  selectShadow: 'rgba(0, 0, 0, 0.16)',
  line: '#F2F4F4',
  darkLine: '#D5DDDC',
  icon: '#616868',
  tabsLine: '#DDDDDD',
  tabsSelectedTint: '#242424',
  profileTabLine: '#E1E1E1',
  profileTabText: '#BABABA',
  planSelectedBackground: '#F0FBFC',
  /** Common */
  appHeaderTextLight: COMMON.WHITE,
  appHeaderIconLight: GREEN_BLUE.LIGHT,
  appHeaderBorderLight: GREEN_BLUE.MEDIUM_LIGHT,
  appHeaderTextDark: BLACK.TEXT,
  appHeaderIconDark: BLACK.TEXT,
  appHeaderBorderDark: GREY.DETAILS,
  lightAccentDetails: GREEN_BLUE.MEDIUM_LIGHT,
  textAccent: GREEN_BLUE.PRIMARY,
  textGrey: GREY.TEXT,
  textLightGrey: GREY.TEXT_LIGHT,
  screenBackground: COMMON.WHITE,
  screenBackgroundAccent: GREEN_BLUE.BODY_GRADIENT,
  modalOverlay: GREY.MODAL_OVERLAY,
  detailsActive: GREEN_BLUE.PRIMARY,
  detailsInactive: GREY.DETAILS,
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
  buttonBackgroundDisabled: GREY.BACKGROUND_DISABLED, //'#F2F4F4'
  buttonBorderPressed: GREEN_BLUE.PRIMARY,
  buttonBorderDisabled: GREY.DETAILS,
  /** Secondary button */
  buttonLightText: BLACK.TEXT,
  buttonLightTextDisabled: GREY.TEXT_LIGHT,
  buttonLightTextPressed: GREEN_BLUE.PRIMARY,
  buttonLightBackground: COMMON.WHITE,
  buttonLightBackgroundDisabled: COMMON.WHITE,
  buttonLightBackgroundPressed: GREY.BACKGROUND_EXTRA_LIGHT,
  buttonLightBorder: BLACK.TEXT,
  buttonLightBorderDisabled: GREY.TEXT_LIGHT,
  buttonLightBorderPressed: GREEN_BLUE.PRIMARY,
  /** Inputs */
  formFieldBackground: GREY.BACKGROUND_EXTRA_LIGHT,
  placeholder: GREY.TEXT_LIGHT,
  inputTitle: GREY.TEXT,
  inputBorder: GREY.DETAILS,
  inputBackground: GREY.BACKGROUND_EXTRA_LIGHT,
  inputFocusedBackground: COMMON.WHITE,
  inputFocusedBorder: GREEN_BLUE.PRIMARY,
  inputDisabledText: GREY.TEXT_LIGHT,
  inputDisabledBackground: GREY.BACKGROUND_DISABLED, //'#F2F4F4'
  checkboxIcon: COMMON.WHITE,
  checkboxBackground: COMMON.WHITE,
  checkboxBackgroundActive: GREEN_BLUE.PRIMARY,
  checkboxBorder: BLACK.TEXT,
  switchThumbBackground: COMMON.WHITE,
  switchTrackBackground: GREY.DETAILS,
  switchTrackBackgroundActive: GREEN_BLUE.PRIMARY,
}

const DARK: Record<keyof ColorThemeStructure, string> = {
  whiteText: '#FFFFFF',
  text: '#303535',
  subText: '#B2BEBD',
  tipText: '#616868',
  lightText: '#757575',
  button: '#4B9DA4',
  button2: '#46949B',
  buttonPressed: '#347B81',
  buttonDisabled: '#F2F4F4',
  buttonLabel: '#FFFFFF',
  buttonDisabledLabel: '#B2BEBD',
  primary1: '#347B81',
  primary2: '#84BDBE',
  primary3: '#B4DCD8',
  navigationLabelSelected: '#FFFFFF',
  card: '#FFFFFF',
  shadow: 'rgba(31,31,31,0.51)',
  selectShadow: 'rgba(0, 0, 0, 0.16)',
  line: '#F2F4F4',
  darkLine: '#D5DDDC',
  icon: '#616868',
  tabsLine: '#DDDDDD',
  tabsSelectedTint: '#242424',
  profileTabLine: '#E1E1E1',
  profileTabText: '#BABABA',
  planSelectedBackground: '#F0FBFC',
  /** Common */
  appHeaderTextLight: COMMON.WHITE,
  appHeaderIconLight: GREEN_BLUE.LIGHT,
  appHeaderBorderLight: GREEN_BLUE.MEDIUM_LIGHT,
  appHeaderTextDark: BLACK.TEXT,
  appHeaderIconDark: BLACK.TEXT,
  appHeaderBorderDark: GREY.DETAILS,
  lightAccentDetails: GREEN_BLUE.MEDIUM_LIGHT,
  textAccent: GREEN_BLUE.PRIMARY,
  textGrey: GREY.TEXT,
  textLightGrey: GREY.TEXT_LIGHT,
  screenBackground: COMMON.WHITE,
  screenBackgroundAccent: GREEN_BLUE.BODY_GRADIENT,
  modalOverlay: GREY.MODAL_OVERLAY,
  detailsActive: GREEN_BLUE.PRIMARY,
  detailsInactive: GREY.DETAILS,
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
  buttonBorderPressed: GREEN_BLUE.PRIMARY,
  buttonBorderDisabled: GREY.DETAILS,
  /** Secondary button */
  buttonLightText: BLACK.TEXT,
  buttonLightTextDisabled: GREY.TEXT_LIGHT,
  buttonLightTextPressed: GREEN_BLUE.PRIMARY,
  buttonLightBackground: COMMON.WHITE,
  buttonLightBackgroundDisabled: COMMON.WHITE,
  buttonLightBackgroundPressed: GREY.BACKGROUND_EXTRA_LIGHT,
  buttonLightBorder: BLACK.TEXT,
  buttonLightBorderDisabled: GREY.TEXT_LIGHT,
  buttonLightBorderPressed: GREEN_BLUE.PRIMARY,
  /** Inputs */
  formFieldBackground: GREY.BACKGROUND_EXTRA_LIGHT,
  placeholder: GREY.TEXT_LIGHT,
  inputTitle: GREY.TEXT,
  inputBorder: GREY.DETAILS,
  inputBackground: GREY.BACKGROUND_EXTRA_LIGHT,
  inputFocusedBackground: COMMON.WHITE,
  inputFocusedBorder: GREEN_BLUE.PRIMARY,
  inputDisabledText: GREY.TEXT_LIGHT,
  inputDisabledBackground: GREY.BACKGROUND_DISABLED,
  checkboxIcon: COMMON.WHITE,
  checkboxBackground: COMMON.WHITE,
  checkboxBackgroundActive: GREEN_BLUE.PRIMARY,
  checkboxBorder: BLACK.TEXT,
  switchThumbBackground: COMMON.WHITE,
  switchTrackBackground: GREY.DETAILS,
  switchTrackBackgroundActive: GREEN_BLUE.PRIMARY,
}

export const COLOR_THEMES: Record<ColorThemes, ColorThemeStructure> = {
  LIGHT,
  DARK,
}

export const defaultColors = COLOR_THEMES.LIGHT
