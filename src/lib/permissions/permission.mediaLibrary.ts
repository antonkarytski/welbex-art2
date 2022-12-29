import { useStore } from 'effector-react'
import {
  $mediaLibraryPermission,
  getMediaLibraryPermission,
} from '../../features/imagePick/model.permissions'
import { goToSettings } from './helpers'

export async function permissionsForceRequest() {
  if (await getMediaLibraryPermission()) return
  goToSettings().catch(() => {})
}

export function useMediaLibraryPermission() {
  const isGranted = useStore($mediaLibraryPermission)
  return { get: getMediaLibraryPermission, isGranted }
}
