import React from 'react'
import { KeyboardAvoidingView, StyleSheet } from 'react-native'
import { IS_IOS } from '../../../lib/helpers/native/constants'
import { buttonPrimaryThemedPreset } from '../../../styles/buttons'
import { inputThemedStyles } from '../../../styles/inputs'
import { useText } from '../../../translations/hook'
import H2 from '../../../ui/H2'
import DateField from '../../../ui/form/DateField'
import Field from '../../../ui/form/Field'
import { useThemedStyleList } from '../../themed/hooks'
import UserDataValidationButton from './UserDataValidationButton'
import { userDataSignUpFormModel } from './model'

const UserDataSignUpForm = () => {
  const t = useText()
  const { styles } = useThemedStyleList({
    field: inputThemedStyles,
    button: buttonPrimaryThemedPreset,
  })

  return (
    <>
      <KeyboardAvoidingView behavior={IS_IOS ? 'padding' : undefined}>
        <H2 label={t.createNewAccount} style={featureStyles.formTitle} />
        {userDataSignUpFormModel.mapKeys((name) => {
          if (name === 'birthDate') {
            return (
              <DateField
                key={name}
                placeholder={t.birthDate}
                formModel={userDataSignUpFormModel}
                name={name}
                style={styles.field}
                validateOnBlur
              />
            )
          }
          return (
            <Field
              validateOnBlur
              key={name}
              placeholder={t[name]}
              formModel={userDataSignUpFormModel}
              name={name}
              style={styles.field}
              type={name === 'email' ? 'email-address' : 'default'}
            />
          )
        })}
      </KeyboardAvoidingView>
      <UserDataValidationButton preset={styles.button} />
    </>
  )
}

const featureStyles = StyleSheet.create({
  formTitle: {
    textAlign: 'center',
  },
})

export default UserDataSignUpForm
