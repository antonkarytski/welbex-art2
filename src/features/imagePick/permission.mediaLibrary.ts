import { useStore } from 'effector-react'
import { goToSettings } from '../../lib/permissions/helpers'
import { mediaLibraryPermission } from './model.permissions'

export async function permissionsForceRequest() {
  if (await mediaLibraryPermission.check()) return
  goToSettings().catch(() => {})
}

export function useMediaLibraryPermission() {
  const isGranted = useStore(mediaLibraryPermission.$isGranted)
  return { get: mediaLibraryPermission.check, isGranted }
}
