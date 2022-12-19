import { UnionFrom } from '../../types'
import { COLOR_THEMES, ColorThemeStructure, ColorThemes } from './theme'

export const memoizedThemedListGetter = <L extends Record<ColorThemes, any>>(
  list: L,
  generator: (colors: ColorThemeStructure, theme: ColorThemes) => UnionFrom<L>
) => {
  return (theme: ColorThemes) => {
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
