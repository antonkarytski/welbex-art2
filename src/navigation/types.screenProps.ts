import { links } from './links'

type TScreensPropsProto<T extends Partial<Record<links, any>>> = T &
  Record<Exclude<links, keyof T>, undefined>

export type TScreensProps = TScreensPropsProto<{}>
