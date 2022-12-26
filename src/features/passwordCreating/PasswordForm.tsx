import React from 'react'
import { View } from 'react-native'
import { useText } from '../../translations/hook'

type PasswordFormProps = {
  setPasswordPlaceholder?: string
  repeatPasswordPlaceholder?: string
}

const PasswordForm = ({
  setPasswordPlaceholder,
  repeatPasswordPlaceholder,
}: PasswordFormProps) => {
  const t = useText()

  return <View />
}

export default PasswordForm
