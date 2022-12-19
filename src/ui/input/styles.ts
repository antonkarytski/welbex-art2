import { StyleSheet } from 'react-native'
import { createThemedStyle } from '../../features/themed'
import * as FONTS from '../../styles/fonts'

export const themedInputStyles = createThemedStyle((colors) => StyleSheet.create({
	container: {
		width: '100%'
	},
	title: {
		marginBottom: 8,
		color: colors.inputTitle,
		fontSize: 14,
		fontFamily: FONTS.FONT_MEDIUM
	},
	input: {
		backgroundColor: colors.inputBackground,
		borderRadius: 8,
		paddingVertical: 16,
		paddingHorizontal: 20,
		color: colors.text,
		fontSize: 16,
		fontFamily: FONTS.FONT_MEDIUM,
		lineHeight: 19,
	},
	border: {
		borderWidth: 1,
		borderStyle: 'solid',
		borderColor: colors.inputBorder,
	},
	input__focused: {
		borderColor: colors.inputFocusedBorder,
		backgroundColor: colors.inputFocusedBackground
	},
	input__invalid: {
		borderColor: colors.errorBorder,
	},
	input__valid: {
		borderColor: colors.successBorder,
	},
	input__disabled: {
		backgroundColor: colors.inputDisabledBackground,
	},
}))
