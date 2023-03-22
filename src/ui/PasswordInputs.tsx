import { useStore } from 'effector-react'
import React from 'react'
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native'
import { FormModel } from '../lib/models/form/model.form'
import { PasswordsFormModel } from '../lib/models/passwordsForm/model'
import { ErrorNote, SecureField, SuccessNote } from './form'
import { InputStyles } from './input/types'

type PasswordInputsProps<M extends PasswordsFormModel> = {
  passwordPlaceholder: string
  repeatPasswordPlaceholder: string
  model: FormModel<M>
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

const PasswordInputs = <M extends Record<string, any> = {}>({
  passwordPlaceholder,
  repeatPasswordPlaceholder,
  model,
  validLabel = '',
  invalidLabel = '',
  iconColors,
  style,
}: PasswordInputsProps<PasswordsFormModel & M>) => {
  const isValid = useStore(model.validation.$state)
  const passwords = useStore(model.$store)
  const isPasswordEmpty = !passwords.password && !passwords.passwordConfirmation

  return (
    <View style={style?.formWrapper}>
      <SecureField
        placeholder={passwordPlaceholder}
        formModel={model}
        name={model.fields.password}
        isValid={isValid}
        style={{ ...styles, ...style?.input }}
      />
      <SecureField
        placeholder={repeatPasswordPlaceholder}
        formModel={model}
        name={model.fields.passwordConfirmation}
        isValid={isValid}
        style={{ ...styles, ...style?.input }}
      />
      {isValid === false && !isPasswordEmpty && (
        <ErrorNote label={invalidLabel} iconColor={iconColors?.error} />
      )}
      {isValid === true && !isPasswordEmpty && (
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
