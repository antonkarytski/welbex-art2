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
import { createThemedStyle } from '../../themed'
import { useThemedStyleList } from '../../themed/hooks'
import { $isLoginAccessError, logIn, logInFormModel } from './model'

const LogInForm = () => {
  const navigate = useNavigate()
  const t = useText()
  const { styles, colors } = useThemedStyleList({
    field: inputThemedStyles,
    button: buttonPrimaryThemedPreset,
    common: themedStyles,
  })

  const isLoading = useStore(logIn.pending)
  const isLoginAccessError = useStore($isLoginAccessError)

  const onForgotPassword = () => {
    navigate(links.recoverPassword)
  }

  return (
    <KeyboardAvoidingView behavior={IS_IOS ? 'padding' : 'height'}>
      <H2 label={t.loginGreeting} style={styles.common.formTitle} />
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
        style={{ ...styles.field, wrapper: styles.common.lastFormField }}
      />
      {isLoginAccessError && (
        <Span
          label={t.incorrectLoginCredentials}
          style={[errorTextThemedStyles(colors), styles.common.loginErrorNote]}
        />
      )}
      <TextButton
        label={t.forgotPasswordQ}
        onPress={onForgotPassword}
        style={{ button: styles.common.forgotPasswordButton }}
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

const themedStyles = createThemedStyle((colors) =>
  StyleSheet.create({
    formTitle: {
      textAlign: 'center',
      color: colors.text,
    },
    lastFormField: {
      marginBottom: 0,
    },
    forgotPasswordButton: {
      marginVertical: 10,
      marginLeft: 'auto',
    },
    loginErrorNote: {
      marginTop: 10,
    },
  })
)

export default LogInForm
