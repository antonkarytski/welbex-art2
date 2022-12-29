import { useCallback, useRef } from 'react'

type UncontrolledListSettings<A> = {
  maxCount?: number
  onFilledChange?: (isFilled: boolean) => void
  onUpdate?: (value: A) => void
}

export function useUncontrolledList<T, A extends T[] = T[]>(
  initial: A,
  { onFilledChange, onUpdate, maxCount }: UncontrolledListSettings<A> = {}
) {
  const list = useRef(initial)

  const set = useCallback(
    (newValue: A) => {
      if (newValue.length && !list.current.length) onFilledChange?.(true)
      if (!newValue.length && list.current.length) onFilledChange?.(false)
      list.current = newValue
      onUpdate?.(list.current)
    },
    [onFilledChange, onUpdate]
  )

  const update = useCallback(
    (element: T) => {
      if (list.current.includes(element)) {
        set(list.current.filter((el) => el !== element) as A)
        return
      }
      if (maxCount === 1) {
        return set([element] as A)
      }
      if (maxCount && list.current.length >= maxCount) {
        return
      }
      set([...list.current, element] as A)
    },
    [set, maxCount]
  )

  const clear = useCallback(() => {
    set([] as any[] as A)
  }, [set])

  return { list, clear, set, update }
}
