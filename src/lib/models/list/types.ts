import { FnExt } from '../../../types'

export type IdExtractor<T> = FnExt<T | Partial<T>, string | number>
export type Id = string | number
