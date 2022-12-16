import { GREEN, GREY, GREEN_BLUE, RED, BLACK, COMMON } from '../../styles/colors'

export enum ColorThemes {
	LIGHT = 'LIGHT',
}

export type ColorThemeStructure = Record<keyof typeof LIGHT, string>
export type colorFn = (structure: ColorThemeStructure) => string

const LIGHT = {
	/** Common */ 
	text: BLACK.TEXT,
	textAccent: GREEN_BLUE.PRIMARY,
	screenBackground: COMMON.WHITE,
	screenBackgroundAccent: GREEN_BLUE.BODY_GRADIENT,
	modalOverlay: GREY.MODAL_OVERLAY,
	scrollBarThumb: GREY.DETAILS,
	/** Main navigation */ 
	navBarBackground: GREEN_BLUE.NAV_BAR_GRADIENT,
	navBarText: GREEN_BLUE.LIGHT,
	navBarTextActive: COMMON.WHITE,
	/** Screen navigation */ 
	screenNavTextInactive:  GREY.TEXT_LIGHT,
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
	inputBorder: GREY.DETAILS,
	inputBackground: GREY.BACKGROUND_EXTRA_LIGHT,
	inputFocusedBackground: COMMON.WHITE,
	inputFocusedBorder: GREEN_BLUE.PRIMARY,
	inputDisabledText: GREY.TEXT_LIGHT,
	// inputInterrogativeBackground: GREEN_BLUE.PRIMARY,
	inputCheckedBackground: COMMON.WHITE,
	inputCheckedBackgroundActive: GREEN_BLUE.PRIMARY,
	switchBackgroundInactive: GREY.DETAILS,
}

export const COLOR_THEMES: Record<ColorThemes, ColorThemeStructure> = {
	LIGHT
}