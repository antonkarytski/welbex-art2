import { useStore } from 'effector-react'
import React from 'react'
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native'
import {
  PasswordsForm,
  PasswordsModel,
} from '../lib/componentsModels/passwordsForm/types'
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
  const arePasswordsValid = useStore(model.$arePasswordsValid)

  return (
    <View style={style?.formWrapper}>
      <SecureField<PasswordsForm>
        placeholder={passwordPlaceholder}
        model={model}
        name={'password'}
        isValid={arePasswordsValid}
        style={{ ...styles, ...style?.input }}
      />
      <SecureField<PasswordsForm>
        placeholder={repeatPasswordPlaceholder}
        model={model}
        name={'repeatingPassword'}
        isValid={arePasswordsValid}
        style={{ ...styles, ...style?.input }}
      />
      {arePasswordsValid === false && (
        <ErrorNote label={invalidLabel} iconColor={iconColors?.error} />
      )}
      {arePasswordsValid === true && (
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
