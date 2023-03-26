import { useStore } from 'effector-react'
import { goToSettings } from '../../lib/permissions/helpers'
import {
  $mediaLibraryPermission,
  getMediaLibraryPermission,
} from './model.permissions'

export async function permissionsForceRequest() {
  if (await getMediaLibraryPermission()) return
  goToSettings().catch(() => {})
}

export function useMediaLibraryPermission() {
  const isGranted = useStore($mediaLibraryPermission)
  return { get: getMediaLibraryPermission, isGranted }
}
