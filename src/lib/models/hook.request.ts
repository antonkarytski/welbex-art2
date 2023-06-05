import { useStore } from 'effector-react'
import { useEffect, useState } from 'react'
import { noop } from '../helpers'
import { RequestModel } from './model.request'

type UseRequestModelSettings<P> = {
  initWithProps?: P
}
export const useRequestModel = <P, R>(
  model: RequestModel<P, R>,
  settings: UseRequestModelSettings<P> = {}
) => {
  const isLoading = useStore(model.$isLoading)
  const data = useStore(model.$data)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const unwatchStart = model.get.watch(() => {
      setError(null)
    })
    const unwatchError = model.get.fail.watch((response) => {
      setError(response.error)
    })

    return () => {
      unwatchStart()
      unwatchError()
    }
  }, [model])

  useEffect(() => {
    //in case if initWithProps is undefined but defined

    if (isLoading || data || !Object.keys(settings).includes('initWithProps')) {
      return
    }
    model.get(settings.initWithProps!).catch(noop)
  }, [settings.initWithProps, model, data])

  return {
    data,
    isLoading,
    error,
  }
}
