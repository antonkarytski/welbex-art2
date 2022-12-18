import { useMemo, useRef } from 'react'
import { mapObject } from '../../lib/helpers/array'
import { NStyle, UseStyleFn } from './createThemedStyles'
import { useColorTheme } from './index'
import { COLOR_THEMES, ColorThemeStructure, ColorThemes } from './theme'

type UseThemeReturn<S> = {
  colors: ColorThemeStructure
  theme: ColorThemes
  styles: S
}
type StylesList<T> = {
  [K in keyof T]: T[K] extends UseStyleFn<infer S> ? S : never
}
type UseStyleFnList = Record<string, UseStyleFn<any>>
export const useThemedStyleListDev = <T extends UseStyleFnList>(
  stylesList: T
): UseThemeReturn<StylesList<T>> => {
  const [theme] = useColorTheme()
  return {
    theme,
    styles: mapObject(stylesList, (value) => value(theme)),
    colors: COLOR_THEMES[theme],
  }
}
export const useThemedStyleListWithMemo = <T extends UseStyleFnList>(
  stylesList: T
): UseThemeReturn<StylesList<T>> => {
  const [theme] = useColorTheme()
  const list = useRef(stylesList).current
  const styles = useMemo(
    () => mapObject(list, (value) => value(theme)),
    [theme, list]
  )
  return {
    theme,
    styles,
    colors: COLOR_THEMES[theme],
  }
}

export function useThemedStyle<T extends NStyle<T>>(styleFn: UseStyleFn<T>) {
  const [theme] = useColorTheme()
  return styleFn(theme)
}

export function useTheme<T extends NStyle<T>>(styles: UseStyleFn<T>) {
  const [theme] = useColorTheme()
  return {
    colors: COLOR_THEMES[theme],
    theme,
    styles: styles(theme),
  }
}

export const useThemedStyleList = __DEV__
  ? useThemedStyleListDev
  : useThemedStyleListWithMemo
