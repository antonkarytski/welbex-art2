import { ReactElement } from 'react'
import { IdentityDocumentStatus } from '../../../api/parts/users/types.api'
import { LangFn } from '../../../translations/types'
import ErrorIcon from '../../../ui/icons/Icon.Error'
import RefreshReverseIcon from '../../../ui/icons/Icon.RefreshReverse'
import SuccessIcon from '../../../ui/icons/Icon.Success'
import { IconProps } from '../../../ui/icons/_types'
import { ColorFn } from '../../themed/theme'

export type ChildDocumentStatusDescriptor = {
  label: LangFn
  Icon: (props: IconProps) => ReactElement | null
  color?: ColorFn
  revokeDisabled?: boolean
  withUploadButtonVariant?: boolean
}

export const CHILD_DOCUMENT_STATUS_DESCRIPTORS: Record<
  IdentityDocumentStatus,
  ChildDocumentStatusDescriptor
> = {
  [IdentityDocumentStatus.UNDETERMINED]: {
    label: () => '',
    Icon: () => null,
    withUploadButtonVariant: true,
  },
  [IdentityDocumentStatus.DETERMINED]: {
    label: (t) => t.childIdentityStatusMessage.accepted,
    Icon: SuccessIcon,
    revokeDisabled: true,
  },
  [IdentityDocumentStatus.PENDING]: {
    label: (t) => t.childIdentityStatusMessage.moderation,
    Icon: RefreshReverseIcon,
    color: (c) => c.textGrey,
  },
  [IdentityDocumentStatus.REJECTED]: {
    withUploadButtonVariant: true,
    label: (t) => t.childIdentityStatusMessage.rejected,
    Icon: ErrorIcon,
    color: (c) => c.errorIcon,
  },
  [IdentityDocumentStatus.JUST_UPLOADED]: {
    label: (t) => t.childIdentityStatusMessage.justUploaded,
    Icon: SuccessIcon,
  },
}

export function getChildDocumentStatusDescriptor(
  status: IdentityDocumentStatus
): ChildDocumentStatusDescriptor {
  return CHILD_DOCUMENT_STATUS_DESCRIPTORS[status]
}
