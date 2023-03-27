import { useStore } from 'effector-react'
import React from 'react'
import { KeyboardAvoidingView, StyleSheet } from 'react-native'
import { IS_IOS } from '../../../lib/helpers/native/constants'
import { useNavigate } from '../../../navigation'
import { links } from '../../../navigation/links'
import { buttonPrimaryThemedPreset } from '../../../styles/buttons'
import { inputThemedStyles } from '../../../styles/inputs'
import { errorTextThemedStyles } from '../../../styles/text'
import { useText } from '../../../translations/hook'
import H2 from '../../../ui/H2'
import Span from '../../../ui/Span'
import AsyncPresetButton from '../../../ui/buttons/AsyncPresetButton'
import TextButton from '../../../ui/buttons/Button.Text'
import Field from '../../../ui/form/Field'
import SecureField from '../../../ui/form/SecureField'
import { useThemedStyleList } from '../../themed/hooks'
import { $isLoginAccessError, logIn, logInFormModel } from './model'

const LogInForm = () => {
  const navigate = useNavigate()
  const t = useText()
  const { styles, colors } = useThemedStyleList({
    field: inputThemedStyles,
    button: buttonPrimaryThemedPreset,
  })

  const isLoading = useStore(logIn.pending)
  const isLoginAccessError = useStore($isLoginAccessError)

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
      <SecureField
        placeholder={t.password}
        formModel={logInFormModel}
        name={'password'}
        style={styles.field}
      />
      {isLoginAccessError && (
        <Span
          label={t.incorrectLoginCredentials}
          style={errorTextThemedStyles(colors)}
        />
      )}
      <TextButton
        label={t.forgotPasswordQ}
        onPress={onForgotPassword}
        style={{ button: featureStyles.forgotPasswordButton }}
      />
      <AsyncPresetButton
        label={t.logInButton}
        onPress={logIn}
        isLoading={isLoading}
        preset={styles.button}
        loaderColor={colors.whiteText}
      />
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
