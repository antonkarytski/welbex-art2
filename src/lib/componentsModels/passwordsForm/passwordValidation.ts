import { PasswordsForm } from './types'

export const validatePasswords = (passwords: PasswordsForm) => {
  const { password, repeatingPassword } = passwords
  // TO DO: add other validation, api request  ??
  if (!password) {
    return false
  }
  return password === repeatingPassword
}
