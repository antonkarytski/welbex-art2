import React, { useState } from 'react'
import ToggleSecureButton from '../buttons/Button.ToggleHiding'
import Field from './Field'
import { SecureFieldProps } from './_types'

const SecureField = <T extends Record<string, string>>({
  placeholder,
  name,
  model,
  isValid,
  iconColor,
  style,
  iconSize,
}: SecureFieldProps<T>) => {
  const [isSecure, setIsSecure] = useState(true)
  const onToggleSecure = () => {
    setIsSecure((prev) => !prev)
  }
  return (
    <Field
      placeholder={placeholder}
      formModel={model}
      name={name}
      style={style}
      isValid={isValid}
      textContentType={'password'}
      type={'default'}
      secureTextEntry={isSecure}
      autoCorrect={false}
      autoCapitalize="none"
      enablesReturnKeyAutomatically
      InputPseudoAfter={
        <ToggleSecureButton
          secure={isSecure}
          onPress={onToggleSecure}
          color={iconColor}
          size={iconSize}
        />
      }
    />
  )
}

export default SecureField
