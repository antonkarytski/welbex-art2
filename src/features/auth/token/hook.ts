import { useEffect } from 'react'
import { useAppState } from '../../../lib/appState/hook'
import { noop } from '../../../lib/helpers'

// import { getToken } from './'

export function useTokenRefresh() {
  const { isInForeground } = useAppState()

  useEffect(() => {
    if (isInForeground) {
      // getToken().catch(noop)
    }
  }, [isInForeground])
}
