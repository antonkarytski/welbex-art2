import { useStoreMap } from 'effector-react'
import { IdentityDocumentStatus } from '../../../api/parts/users/types.api'
import { $myProfile } from '../model'

export function useChildDocumentStatus(): IdentityDocumentStatus
export function useChildDocumentStatus(status: IdentityDocumentStatus): boolean
export function useChildDocumentStatus(
  fn: (status: IdentityDocumentStatus) => boolean
): boolean
export function useChildDocumentStatus(
  statusOrFn?:
    | IdentityDocumentStatus
    | ((status: IdentityDocumentStatus) => boolean)
) {
  return useStoreMap({
    store: $myProfile,
    keys: [],
    fn: (myProfile) => {
      const documentStatus =
        myProfile?.identity_determined_status_id ||
        IdentityDocumentStatus.UNDETERMINED
      if (statusOrFn) {
        if (typeof statusOrFn === 'function') {
          return statusOrFn(documentStatus)
        }
        return (
          myProfile?.identity_determined_status_id ===
          IdentityDocumentStatus.DETERMINED
        )
      }
      return documentStatus
    },
  })
}
