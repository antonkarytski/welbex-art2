import { ValidationList } from '../form/types'
import { PasswordErrors } from './model'
import { PasswordsFormModel } from './types'

export type PasswordsValidationList = ValidationList<PasswordsFormModel>
export function getPasswordsErrorCode<T extends PasswordsValidationList>(
  validation: T
) {
  const list = Object.values(validation)
  const firstRecordWithError = list.find(
    (record) => record?.isValid === false && record?.message
  )
  return firstRecordWithError?.message as PasswordErrors | undefined
}
