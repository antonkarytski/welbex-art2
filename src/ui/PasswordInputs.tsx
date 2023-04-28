import { useStore, useStoreMap } from 'effector-react'
import React from 'react'
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native'
import { FormModel } from '../lib/models/form'
import { PasswordsFormModel } from '../lib/models/passwordsForm/types'
import { SecureField } from './form'
import ValidationNote, { ValidationNoteIconColors } from './form/ValidationNote'
import { InputStyles } from './input/types'

type PasswordInputsProps<M extends PasswordsFormModel> = {
  passwordPlaceholder: string
  repeatPasswordPlaceholder: string
  model: FormModel<M>
  validLabel?: string
  invalidLabel?: string
  iconColors?: ValidationNoteIconColors
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
  const isPasswordsEmpty = useStoreMap({
    store: model.$store,
    keys: [],
    fn: (passwords) => !passwords.password && !passwords.passwordConfirmation,
  })

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
      {!isPasswordsEmpty && (
        <View style={styles.validationNoteWrapper}>
          <ValidationNote
            isValid={isValid}
            validLabel={validLabel}
            invalidLabel={invalidLabel}
            iconColors={iconColors}
          />
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 12,
  },
  validationNoteWrapper: {
    marginRight: 2,
  },
})

export default PasswordInputs
