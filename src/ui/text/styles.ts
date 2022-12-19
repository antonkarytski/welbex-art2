import { StyleSheet } from 'react-native'
import { BLACK, GREEN_BLUE } from '../../styles/colors'
import * as FONTS from '../../styles/fonts'

type SetDefaultFontsProps = {
  regular?: string
  medium?: string
  bold?: string
  semiBold?: string
  size?: number
  color?: string
}

export const textStyles = StyleSheet.create({
  defaults: {
    color: BLACK.TEXT,
    fontSize: 14,
    lineHeight: 19,
  },
  regular: {
    fontFamily: FONTS.FONT_REGULAR,
  },
  medium: {
    fontFamily: FONTS.FONT_MEDIUM,
  },
  semiBold: {
    fontFamily: FONTS.FONT_SEMI_BOLD,
  },
  bold: {
    fontFamily: FONTS.FONT_BOLD,
  },
  title: {
    fontSize: 24,
    lineHeight: 32,
    textAlign: 'center',
    fontFamily: FONTS.FONT_SEMI_BOLD,
  },
  titleSmall: {
    fontSize: 18,
    lineHeight: 22,
    textAlign: 'center',
    fontFamily: FONTS.FONT_SEMI_BOLD,
  },
  link: {
    color: GREEN_BLUE.PRIMARY,
    fontFamily: FONTS.FONT_MEDIUM,
    fontSize: 14,
  },
  center: {
    textAlign: 'center',
  },
  font14: {
    fontSize: 14,
  },
  font16: {
    fontSize: 16,
  },
  font18: {
    fontSize: 18,
  },
  font24: {
    fontSize: 24,
  },
})

export function setDefaults({
  regular,
  medium,
  bold,
  semiBold,
  size,
  color,
}: SetDefaultFontsProps) {
  if (regular) textStyles.regular.fontFamily = regular
  if (medium) {
    textStyles.medium.fontFamily = medium
    textStyles.titleSmall.fontFamily = medium
  }
  if (bold) {
    textStyles.bold.fontFamily = bold
    textStyles.title.fontFamily = bold
    textStyles.link.fontFamily = bold
  }
  if (semiBold) textStyles.semiBold.fontFamily = semiBold
  if (size) textStyles.defaults.fontSize = size
  if (color) textStyles.defaults.color = color
}
