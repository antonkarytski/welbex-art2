import React from 'react'
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native'
import { FormModel } from '../lib/componentsModels/model.form'
import { PasswordsForm } from '../lib/componentsModels/passwordsForm/types'
import { ErrorNote, SecureField, SuccessNote } from './form'
import { InputStyles } from './input/types'

type PasswordInputsProps = {
  passwordPlaceholder: string
  repeatPasswordPlaceholder: string
  model: FormModel<PasswordsForm & Record<string, string>>
  areValid: boolean | null
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
  areValid,
  validLabel = '',
  invalidLabel = '',
  iconColors,
  style,
}: PasswordInputsProps) => {
  return (
    <View style={style?.formWrapper}>
      <SecureField<PasswordsForm>
        placeholder={passwordPlaceholder}
        model={model}
        name={'password'}
        isValid={areValid}
        style={{ ...styles, ...style?.input }}
      />
      <SecureField<PasswordsForm>
        placeholder={repeatPasswordPlaceholder}
        model={model}
        name={'repeatingPassword'}
        isValid={areValid}
        style={{ ...styles, ...style?.input }}
      />
      {areValid !== null && !areValid && (
        <ErrorNote label={invalidLabel} iconColor={iconColors?.error} />
      )}
      {areValid !== null && areValid && (
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
