import { StyleSheet } from 'react-native'
import * as FONTS from '../../styles/fonts'
import { COLOR_THEMES } from '../../features/themed/theme'

const defaultColors = COLOR_THEMES.LIGHT

export const placeholderColor = defaultColors.placeholder

export const inputStyles = StyleSheet.create({
	container: {
		width: '100%',
	},
	label: {
		marginBottom: 8,
		color: defaultColors.inputTitle,
		fontSize: 14,
		fontFamily: FONTS.FONT_MEDIUM,
	},
	input: {
		backgroundColor: defaultColors.inputBackground,
		borderRadius: 8,
		paddingVertical: 16,
		paddingHorizontal: 20,
		color: defaultColors.text,
		fontSize: 16,
		fontFamily: FONTS.FONT_MEDIUM,
		lineHeight: 19,
	},
	border: {
		borderWidth: 1,
		borderStyle: 'solid',
		borderColor: defaultColors.inputBorder,
	},
	input__focused: {
		borderColor: defaultColors.inputFocusedBorder,
		backgroundColor: defaultColors.inputFocusedBackground,
	},
	input__invalid: {
		borderColor: defaultColors.errorBorder,
	},
	input__valid: {
		borderColor: defaultColors.successBorder,
	},
	input__disabled: {
		backgroundColor: defaultColors.inputDisabledBackground,
	},
})
