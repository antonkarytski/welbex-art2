import { ICategory } from '../features/categories/types'
import { links } from './links'

type ScreensPropsProto<T extends Partial<Record<links, any>>> = T &
  Record<Exclude<links, keyof T>, undefined>

export type ScreensProps = ScreensPropsProto<{
  [links.categoryDetails]: { item: ICategory }
}>
