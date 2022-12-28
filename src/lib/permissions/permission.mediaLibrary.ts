import { attach, createEffect } from 'effector'
import { useStore } from 'effector-react'
import * as ImagePicker from 'expo-image-picker'
import { useEffect } from 'react'
import { noop } from '../helpers'
import { goToSettings } from './helpers'
import { $mediaLibraryPermission, setMediaLibraryPermission } from './model'

export const getMediaLibraryPermission = attach({
  source: $mediaLibraryPermission,
  mapParams: (_: void, isGranted) => isGranted,
  effect: createEffect(async (isGranted: boolean) => {
    if (isGranted) return isGranted
    const savedPermission = await ImagePicker.getMediaLibraryPermissionsAsync()
    if (savedPermission.status === 'granted') {
      setMediaLibraryPermission()
      return true
    }
    const requestedPermission =
      await ImagePicker.requestMediaLibraryPermissionsAsync()
    if (requestedPermission.status !== 'denied') {
      setMediaLibraryPermission()
      return true
    }
    return false
  }),
})

export async function permissionsForceRequest() {
  if (await getMediaLibraryPermission()) return
  goToSettings().catch(() => {})
}

export function useMediaLibraryPermissionInit() {
  useEffect(() => {
    getMediaLibraryPermission().catch(noop)
  }, [])
}

export function useMediaLibraryPermission() {
  const isGranted = useStore($mediaLibraryPermission)
  return { get: getMediaLibraryPermission, isGranted }
}
