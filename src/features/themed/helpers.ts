import { UnionFrom } from '../../types'
import { COLOR_THEMES, ColorThemeStructure, ColorThemes } from './theme'

export const memoizedThemedListGetter = <L extends Record<ColorThemes, any>>(
  list: L,
  generator: (colors: ColorThemeStructure, theme: ColorThemes) => UnionFrom<L>
): (<Theme extends ColorThemes>(
  theme: ColorThemes
) => Exclude<L[Theme], null>) => {
  return (theme) => {
    return (
      list[theme] ||
      (() => {
        const style = generator(COLOR_THEMES[theme], theme)
        list[theme] = style
        return style
      })()
    )
  }
}
export const createEmptyThemesList = <T>(): Record<ColorThemes, T | null> => ({
  [ColorThemes.DARK]: null,
  [ColorThemes.LIGHT]: null,
})
