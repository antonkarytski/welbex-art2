import { Effect } from 'effector'
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from 'react'

type EffectResult<E extends Effect<any, any>> = E extends Effect<any, infer R>
  ? R
  : never

type IUseRequest<E extends Effect<any, any>, DT> = {
  data: DT
  isLoading: boolean
  error: Error | null
  request: E
  update: (data: DT extends object ? Partial<DT> : DT) => void
  set: Dispatch<SetStateAction<NonNullable<EffectResult<E>> | null>>
}

export function useRequest<E extends Effect<any, any>>(
  request: E
): IUseRequest<E, EffectResult<E> | null>
export function useRequest<E extends Effect<any, any>>(
  request: E,
  initialState: EffectResult<E>
): IUseRequest<E, EffectResult<E>>
export function useRequest<E extends Effect<any, any>>(
  request: E,
  initialState?: EffectResult<E>
) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  const [data, setData] = useState(initialState ?? null)

  useEffect(() => {
    const unwatchStart = request.watch(() => {
      setError(null)
      setIsLoading(true)
    })
    const unwatchDone = request.done.watch((response) => {
      setData(response.result)
    })
    const unwatchError = request.fail.watch((response) => {
      setError(response.error)
    })
    const unwatchFinally = request.finally.watch(() => {
      setIsLoading(false)
    })

    return () => {
      unwatchStart()
      unwatchDone()
      unwatchError()
      unwatchFinally()
    }
  }, [request])

  const update = useCallback(
    (
      updateValue: EffectResult<E> extends object
        ? Partial<EffectResult<E>>
        : EffectResult<E>
    ) => {
      if (typeof updateValue === 'object') {
        return setData((current) => {
          if (!current) return current
          return {
            ...current,
            ...updateValue,
          }
        })
      }
      setData(updateValue as EffectResult<E>)
    },
    []
  )

  return { data, error, isLoading, request, update, set: setData }
}
