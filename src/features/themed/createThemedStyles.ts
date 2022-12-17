import { ImageStyle, TextStyle, ViewStyle } from 'react-native'
import { COLOR_THEMES, ColorThemeStructure, ColorThemes } from './theme'

export type NamedStyles<T> = {
  [P in keyof T]: ViewStyle | TextStyle | ImageStyle
}
export type NStyle<T> = NamedStyles<T> | NamedStyles<any>

export type CreateStyleFn<T extends NStyle<T>> = (
  colors: ColorThemeStructure,
  theme: ColorThemes
) => T | NamedStyles<T>
export type UseStyleFn<T extends NStyle<T>> = (
  theme: ColorThemes
) => T | NamedStyles<T>

export const createThemedStylesCommon = <T extends NStyle<T>>(
  styleGenerator: CreateStyleFn<T>
): UseStyleFn<T> => {
  return (theme) => styleGenerator(COLOR_THEMES[theme], theme)
}

export const createThemedStylesWithMemo = <T extends NStyle<T>>(
  styleGenerator: CreateStyleFn<T>
): UseStyleFn<T> => {
  const memoizedStyles: Record<ColorThemes, T | NamedStyles<T> | null> = {
    [ColorThemes.DARK]: null,
    [ColorThemes.LIGHT]: null,
  }
  return (theme) => {
    return (
      memoizedStyles[theme] ||
      (() => {
        const style = styleGenerator(COLOR_THEMES[theme], theme)
        memoizedStyles[theme] = style
        return style
      })()
    )
  }
}
