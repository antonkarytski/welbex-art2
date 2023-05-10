import { useMemo } from 'react'
import { MergedUnit } from '../../types'
import { NStyle } from './createThemedStyles'

const INITIAL_LIST = {}

export const useMergedStyles = <S extends NStyle<any>>(
  rawStyles: S[]
): MergedUnit<S> => {
  return useMemo(() => {
    return rawStyles.reduce<MergedUnit<S>>((acc, styleList) => {
      if (acc === INITIAL_LIST) return styleList
      const copy = { ...acc }
      Object.keys(styleList).forEach((key: keyof S) => {
        const currenStyles = acc[key]
        const newStyle = styleList[key]
        if (!currenStyles) {
          copy[key] = newStyle
          return
        }
        if (Array.isArray(currenStyles)) {
          copy[key] = [...currenStyles, newStyle]
          return
        }
        copy[key] = [currenStyles as S[keyof S], newStyle]
      })
      return copy
    }, INITIAL_LIST as S)
  }, [...rawStyles])
}
