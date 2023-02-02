import { useFocusEffect } from '@react-navigation/native'
import { useCallback, useMemo, useRef, useState } from 'react'
//import { RNCamera } from 'react-native-camera'
import { ViewToken } from 'react-native'

export function useCameraPreview() {
  const ref = useRef<any | null>(null)
  const [reloadKey, setReloadKey] = useState(0)
  const reloadCamera = useCallback(({ changed }: { changed: ViewToken[] }) => {
    if (!ref?.current) return
    const cameraElement = changed.find(({ index }) => {
      return index === 1
    })
    if (!cameraElement || !cameraElement.isViewable) return
    setReloadKey((key) => key + 1)
  }, [])

  const viewabilityConfig = useRef([
    {
      onViewableItemsChanged: reloadCamera,
      viewabilityConfig: {
        waitForInteraction: false,
        itemVisiblePercentThreshold: 1,
      },
    },
  ])

  useFocusEffect(
    useCallback(() => {
      setReloadKey((key) => key + 1)
    }, [])
  )

  return useMemo(() => {
    return { ref, reloadKey, viewabilityConfig }
  }, [reloadKey])
}
