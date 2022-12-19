import { CompetitionCategory } from '../features/categories/types'
import { Drawing } from '../features/drawing/types'
import { links } from './links'

type ScreensPropsProto<T extends Partial<Record<links, any>>> = T &
  Record<Exclude<links, keyof T>, undefined>

export type ScreensProps = ScreensPropsProto<{
  [links.categoryDetails]: { item: CompetitionCategory }
  [links.drawingDetails]: { item: Drawing }
}>
