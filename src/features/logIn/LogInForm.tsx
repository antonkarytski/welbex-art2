import React from 'react'
import { KeyboardAvoidingView } from 'react-native'
import { IS_IOS } from '../../lib/platform'
import { useNavigate } from '../../navigation'
import { links } from '../../navigation/links'
import { useText } from '../../translations/hook'
import H2 from '../../ui/H2'
import TextButton from '../../ui/buttons/Button.Text'
import Button from '../../ui/buttons/PresetButton'
import Field from '../../ui/form/Field'
import { useThemedStyleList } from '../themed/hooks'
import { logInFormModel } from './model'
import {
  featureStyles,
  inputThemedStyles,
  themedButtonPreset,
  themedTextButtonStyles,
} from './styles'

const LogInForm = () => {
  const navigate = useNavigate()
  const t = useText()
  const { styles } = useThemedStyleList({
    field: inputThemedStyles,
    button: themedButtonPreset,
    textButton: themedTextButtonStyles,
  })

  const onLogIn = () => {}
  const onForgotPassword = () => {
    navigate(links.passwordRecover)
  }

  return (
    <KeyboardAvoidingView behavior={IS_IOS ? 'padding' : 'height'}>
      <H2 label={t.loginGreeting} style={featureStyles.formTitle} />
      <Field
        placeholder={t.email}
        formModel={logInFormModel}
        name={'email'}
        styles={styles.field}
      />
      <Field
        placeholder={t.password}
        formModel={logInFormModel}
        name={'password'}
        styles={styles.field}
      />
      <TextButton
        label={t.forgotPasswordQ}
        onPress={onForgotPassword}
        styles={styles.textButton}
      />
      <Button label={t.logInButton} onPress={onLogIn} preset={styles.button} />
    </KeyboardAvoidingView>
  )
}

export default LogInForm
