import React from 'react'
import { KeyboardAvoidingView, StyleSheet } from 'react-native'
import { IS_IOS } from '../../../lib/helpers/native/constants'
import { useNavigate } from '../../../navigation'
import { links } from '../../../navigation/links'
import { buttonPrimaryThemedPreset } from '../../../styles/buttons'
import { inputThemedStyles } from '../../../styles/inputs'
import { useText } from '../../../translations/hook'
import H2 from '../../../ui/H2'
import TextButton from '../../../ui/buttons/Button.Text'
import Button from '../../../ui/buttons/PresetButton'
import Field from '../../../ui/form/Field'
import { useThemedStyleList } from '../../themed/hooks'
import { logIn, logInFormModel } from './model'

const LogInForm = () => {
  const navigate = useNavigate()
  const t = useText()
  const { styles } = useThemedStyleList({
    field: inputThemedStyles,
    button: buttonPrimaryThemedPreset,
  })

  const onLogIn = () => {}
  const onForgotPassword = () => {
    navigate(links.recoverPassword)
  }

  return (
    <KeyboardAvoidingView behavior={IS_IOS ? 'padding' : 'height'}>
      <H2 label={t.loginGreeting} style={featureStyles.formTitle} />
      <Field
        placeholder={t.email}
        formModel={logInFormModel}
        name={'email'}
        style={styles.field}
      />
      <Field
        placeholder={t.password}
        formModel={logInFormModel}
        name={'password'}
        style={styles.field}
      />
      <TextButton
        label={t.forgotPasswordQ}
        onPress={onForgotPassword}
        style={{ button: featureStyles.forgotPasswordButton }}
      />
      <Button label={t.logInButton} onPress={logIn} preset={styles.button} />
    </KeyboardAvoidingView>
  )
}

const featureStyles = StyleSheet.create({
  formTitle: {
    textAlign: 'center',
  },
  forgotPasswordButton: {
    marginVertical: 10,
    marginLeft: 'auto',
  },
})

export default LogInForm
