import { ImageStyle, TextStyle, ViewStyle } from 'react-native'
import { createColorTheme } from 'altek-toolkit'
import { ScreenWrapper } from 'altek-ui'
import { COLOR_THEME_DEFAULT } from '../../constants/settings'
import {
  createThemedStylesCommon,
  createThemedStylesWithMemo,
} from './createThemedStyles'
import { COLOR_THEMES, ColorThemeStructure } from './theme'

export const { useColors, useColorTheme, $colorTheme, withThemedProps } =
  createColorTheme(COLOR_THEMES, COLOR_THEME_DEFAULT)

type AnyStyle = ViewStyle | TextStyle | ImageStyle
export type CreateSingleStyleFn<S extends AnyStyle> = (
  colors: ColorThemeStructure
) => S

export const createSingleThemedStyle = <S extends AnyStyle>(
  fn: CreateSingleStyleFn<S>
) => fn

export const createThemedStyle = __DEV__
  ? createThemedStylesCommon
  : createThemedStylesWithMemo

export const ThemedScreenWrapper = withThemedProps(ScreenWrapper, (colors) => {
  return { backgroundColor: colors.screenBackground }
})
