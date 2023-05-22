import { ReactElement } from 'react'
import { IdentityDocumentStatus } from '../../../api/parts/users/types.api'
import { LangFn } from '../../../translations/types'
import ErrorIcon from '../../../ui/icons/Icon.Error'
import RefreshIcon from '../../../ui/icons/Icon.Refresh'
import RefreshReverseIcon from '../../../ui/icons/Icon.RefreshReverse'
import SuccessIcon from '../../../ui/icons/Icon.Success'
import { IconProps } from '../../../ui/icons/_types'
import { ColorFn } from '../../themed/theme'

type ChildDocumentStatusDescriptor = {
  label: LangFn
  Icon: (props: IconProps) => ReactElement | null
  color?: ColorFn
}

export const CHILD_DOCUMENT_STATUS_DESCRIPTORS: Record<
  IdentityDocumentStatus,
  ChildDocumentStatusDescriptor
> = {
  [IdentityDocumentStatus.DETERMINED]: {
    label: (t) => t.childDocumentUploaded,
    Icon: SuccessIcon,
  },
  [IdentityDocumentStatus.PENDING]: {
    label: (t) => t.childIdentificationDocumentIsInModeration,
    Icon: RefreshReverseIcon,
    color: (c) => c.textGrey,
  },
  [IdentityDocumentStatus.REJECTED]: {
    label: (t) => t.childIdentificationDocumentRejected,
    Icon: ErrorIcon,
    color: (c) => c.errorIcon,
  },
  [IdentityDocumentStatus.UNDETERMINED]: {
    label: () => '',
    Icon: () => null,
  },
}

export function getChildDocumentStatusDescriptor(
  status: IdentityDocumentStatus
): ChildDocumentStatusDescriptor {
  return CHILD_DOCUMENT_STATUS_DESCRIPTORS[status]
}
