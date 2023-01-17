import { useStore } from 'effector-react'
import React from 'react'
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native'
import { PasswordsModel } from '../lib/componentsModels/passwordsForm/types'
import { ErrorNote, SecureField, SuccessNote } from './form'
import { InputStyles } from './input/types'

type PasswordInputsProps = {
  passwordPlaceholder: string
  repeatPasswordPlaceholder: string
  model: PasswordsModel
  validLabel?: string
  invalidLabel?: string
  iconColors?: {
    success?: string
    error?: string
  }
  style?: {
    formWrapper?: StyleProp<ViewStyle>
    input?: InputStyles
  }
}

const PasswordInputs = ({
  passwordPlaceholder,
  repeatPasswordPlaceholder,
  model,
  validLabel = '',
  invalidLabel = '',
  iconColors,
  style,
}: PasswordInputsProps) => {
  const isValidResult = useStore(model.$isValid)
  const isValid = isValidResult?.result

  return (
    <View style={style?.formWrapper}>
      <SecureField
        placeholder={passwordPlaceholder}
        model={model}
        name={model.fields.password}
        isValid={isValid}
        style={{ ...styles, ...style?.input }}
      />
      <SecureField
        placeholder={repeatPasswordPlaceholder}
        model={model}
        name={model.fields.repeatingPassword}
        isValid={isValid}
        style={{ ...styles, ...style?.input }}
      />
      {isValid === false && (
        <ErrorNote label={invalidLabel} iconColor={iconColors?.error} />
      )}
      {isValid === true && (
        <SuccessNote label={validLabel} iconColor={iconColors?.success} />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 12,
  },
})

export default PasswordInputs
