import { ReactElement } from 'react'
import { IdentityDocumentStatus } from '../../../api/parts/users/types.api'
import { LangFn } from '../../../translations/types'
import ErrorIcon from '../../../ui/icons/Icon.Error'
import RefreshIcon from '../../../ui/icons/Icon.Refresh'
import SuccessIcon from '../../../ui/icons/Icon.Success'
import { IconProps } from '../../../ui/icons/_types'
import { ColorFn } from '../../themed/theme'

type ChildDocumentStatusDescriptor = {
  label: LangFn
  Icon: (props: IconProps) => ReactElement | null
  color?: ColorFn
}

const DESCRIPTORS: Record<
  IdentityDocumentStatus,
  ChildDocumentStatusDescriptor
> = {
  [IdentityDocumentStatus.DETERMINED]: {
    label: (t) => t.childDocumentUploaded,
    Icon: SuccessIcon,
  },
  [IdentityDocumentStatus.PENDING]: {
    label: (t) => t.childIdentificationDocumentIsInModeration,
    Icon: RefreshIcon,
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
  return DESCRIPTORS[status]
}
