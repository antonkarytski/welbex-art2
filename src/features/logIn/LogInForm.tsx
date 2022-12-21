import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { KeyboardAvoidingView, StyleSheet } from 'react-native'
import { IS_IOS } from '../../lib/platform'
import { links } from '../../navigation/links'
import { useText } from '../../translations/hook'
import H2 from '../../ui/H2'
import TextButton from '../../ui/buttons/Button.Text'
import Button from '../../ui/buttons/PresetButton'
import Input from '../../ui/input'
import { createThemedStyle } from '../themed'
import { useThemedStyle } from '../themed/hooks'
import { $logInForm, setField } from './model'
import { LogInFields } from './types'

const LogInForm = () => {
  const navigation = useNavigation()
  const t = useText()
  const styles = useThemedStyle(themedStyles)

  const onLogIn = () => {}
  const onFormFieldChange = () => {}

  const onForgotPassword = () => {
    // navigation.navigate(links.)
  }

  return (
    <KeyboardAvoidingView behavior={IS_IOS ? 'padding' : 'height'}>
      <H2 label={t.loginGreeting} style={styles.formTitle} />
      <Input
        placeholder={t.email}
        onChangeText={() => {}}
        styleInput={[styles.formField, styles.input]}
      />
      <Input
        placeholder={t.password}
        onChangeText={() => {}}
        styleInput={[styles.formField, styles.input, styles.lastFormField]}
      />
      <TextButton
        label={t.forgotPasswordQ}
        onPress={onForgotPassword}
        style={styles.linkForgotPassword}
      />
      <Button label={t.logInButton} onPress={onLogIn} />
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
      color: colors.textAccent,
    },
    formField: {
      marginBottom: 12,
    },
    lastFormField: {
      marginBottom: 0,
    },
    input: {
      borderColor: colors.inputBorder,
      backgroundColor: colors.inputBackground,
    },
  })
)

export default LogInForm
