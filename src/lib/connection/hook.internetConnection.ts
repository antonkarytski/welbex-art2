import { useStore } from 'effector-react'
import { useEffect, useRef } from 'react'
import { $isConnected } from './model.internet'

type UseReconnectionProps = {
  onReconnect?: () => void
  onDisconnect?: () => void
}

export function useInternetConnection({
  onDisconnect,
  onReconnect,
}: UseReconnectionProps = {}) {
  const isConnected = useStore($isConnected)
  const isConnectedRef = useRef(isConnected)
  const previousConnectionState = useRef(isConnected)

  useEffect(() => {
    if (isConnected && !previousConnectionState.current) {
      previousConnectionState.current = true
      if (onReconnect) onReconnect()
      return
    }
    if (!isConnected && previousConnectionState.current) {
      previousConnectionState.current = false
      if (onDisconnect) onDisconnect()
    }
  }, [isConnected, onDisconnect, onReconnect])

  return { isConnected, isConnectedRef }
}
