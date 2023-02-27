import { ReactNode } from 'react'
import { StyleProp, ViewStyle } from 'react-native'
import { FnExt } from '../../../types'
import { PresetSelectItemStates } from './styles.preset'

type StringExtractor<T> = FnExt<T, string>

export type RenderItem<T> = (item: T, isSelected?: boolean) => ReactNode

export type SelectItemStyles = {
  wrapper?: StyleProp<ViewStyle>
  row_wrapper?: StyleProp<ViewStyle>
  icon_checkMark__wrapper?: StyleProp<ViewStyle>
  icon_checkMark?: StyleProp<ViewStyle>
  item__selected?: StyleProp<ViewStyle>
}

export type SelectItemProps<T> = {
  item: T
  onSelect: (item: T) => void
  renderItem?: RenderItem<T>
  idExtractor?: StringExtractor<T>
  labelExtractor?: StringExtractor<T>
  showSelectedIcon?: boolean
  style?: SelectItemStyles
  isSelected?: boolean
  preset?: PresetSelectItemStates
}
