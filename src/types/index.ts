import { ReactNode } from 'react'

export type UnionFrom<T> = T[keyof T]
export type Timer = ReturnType<typeof setTimeout>
export type Fn<R = void> = () => R
export type FnExt<P, R = void> = (props: P) => R
export type GroupedList<I extends string | number | symbol, V> = Record<
  string | number,
  Record<I, V>
>
export type OrArray<T> = T | T[]
export type WithUniq<I> = I & { uniqId: string }
export type NodeGenerator<T> = (props: T, index: number) => ReactNode
export type NodeFn<T> = (props: T) => ReactNode
