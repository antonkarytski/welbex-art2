import { useState } from 'react'
import {
  PasswordsValidationList,
  getPasswordsErrorCode,
} from '../../../lib/models/passwordsForm/helpers'
import { PasswordErrors } from '../../../lib/models/passwordsForm/model'
import { useText } from '../../../translations/hook'
import { LangFn } from '../../../translations/types'

const PASSWORD_ERROR_CODE: Record<PasswordErrors, LangFn> = {
  [PasswordErrors.PASSWORD_MUST_MATCH]: (t) => t.checkPasswordMatchError,
  [PasswordErrors.PASSWORD_MIN_LENGTH]: (t) => t.checkPasswordLengthError,
}
const getPasswordErrorText = (code: PasswordErrors) => {
  return PASSWORD_ERROR_CODE[code] ?? (() => '')
}

export function usePasswordsError() {
  const t = useText()
  const [passwordError, setPasswordError] = useState('')

  function update<T extends PasswordsValidationList>(list: T) {
    const code = getPasswordsErrorCode(list)
    if (code) {
      const message = getPasswordErrorText(code)
      setPasswordError(message(t))
    }
  }

  return [passwordError, update] as const
}
