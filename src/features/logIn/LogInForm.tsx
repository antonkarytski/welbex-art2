import React from 'react'
import { KeyboardAvoidingView, StyleSheet } from 'react-native'
import { IS_IOS } from '../../lib/platform'
import { useNavigate } from '../../navigation'
import { links } from '../../navigation/links'
import { useText } from '../../translations/hook'
import H2 from '../../ui/H2'
import TextButton from '../../ui/buttons/Button.Text'
import Button from '../../ui/buttons/PresetButton'
import Field from '../../ui/form/Field'
import { createThemedStyle } from '../themed'
import { useThemedStyle, useThemedStyleList } from '../themed/hooks'
import { $store, setField } from './model'

const LogInForm = () => {
  const navigate = useNavigate()
  const t = useText()
  const { styles } = useThemedStyleList({
    common: themedStyles,
    field: inputThemedStyles,
  })

  const onLogIn = () => {}
  const onForgotPassword = () => {
    navigate(links.passwordRecover)
  }

  return (
    <KeyboardAvoidingView behavior={IS_IOS ? 'padding' : 'height'}>
      <H2 label={t.loginGreeting} style={styles.common.formTitle} />
      <Field
        placeholder={t.email}
        store={$store}
        setField={setField}
        name={'email'}
        styles={styles.field}
      />
      <Field
        placeholder={t.password}
        store={$store}
        setField={setField}
        name={'password'}
        styles={styles.field}
      />
      <TextButton
        label={t.forgotPasswordQ}
        onPress={onForgotPassword}
        style={styles.common.linkForgotPassword}
      />
      <Button
        label={t.logInButton}
        onPress={onLogIn}
        style={styles.common.button}
        labelStyle={styles.common.button_label}
      />
    </KeyboardAvoidingView>
  )
}

const themedStyles = createThemedStyle((colors) =>
  StyleSheet.create({
    formTitle: {
      textAlign: 'center',
    },
    linkForgotPassword: {
      marginVertical: 20,
      marginLeft: 'auto',
      color: colors.textAccent,
    },
    lastFormField: {
      marginBottom: 0,
    },
    button: {
      backgroundColor: colors.buttonBackground,
      borderColor: colors.buttonBackground,
    },
    button_label: {
      color: colors.buttonText,
    },
  })
)

const inputThemedStyles = createThemedStyle((colors) =>
  StyleSheet.create({
    wrapper: {
      marginBottom: 12,
    },
    input: {
      borderColor: colors.inputBorder,
      backgroundColor: colors.inputBackground,
    },
  })
)

export default LogInForm
