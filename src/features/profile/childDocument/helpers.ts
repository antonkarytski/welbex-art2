import { IdentityDocumentStatus } from '../../../api/parts/users/types.api'
import { LangStructure } from '../../../translations/types'

export function getChildDocumentStatusText(
  status: IdentityDocumentStatus | undefined,
  text: LangStructure
) {
  if (!status) return ''
  const translations: Partial<Record<IdentityDocumentStatus, string>> = {
    [IdentityDocumentStatus.DETERMINED]:
      text.childIdentificationDocumentApproved,
    [IdentityDocumentStatus.PENDING]:
      text.childIdentificationDocumentIsInModeration,
    [IdentityDocumentStatus.REJECTED]: text.childIdentificationDocumentRejected,
    [IdentityDocumentStatus.UNDETERMINED]: '',
  }
  return translations[status] as string
}
