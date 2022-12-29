import { useEffect, useState } from 'react'
import { InteractionManager } from 'react-native'

export function useScreenLoading() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    InteractionManager.runAfterInteractions(() => {
      setIsLoaded(true)
    })
  }, [])

  return isLoaded
}
