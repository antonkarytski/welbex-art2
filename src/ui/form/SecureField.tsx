import React from 'react'
import { useToggle } from 'altek-toolkit'
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
  const [isSecure, toggleIsSecure] = useToggle(true)

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
          isHidden={isSecure}
          onPress={toggleIsSecure}
          color={iconColor}
          size={iconSize}
        />
      }
    />
  )
}

export default SecureField
