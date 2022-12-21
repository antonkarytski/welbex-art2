import { sample } from 'effector'
import React from 'react'
import { KeyboardAvoidingView, StyleSheet } from 'react-native'
import { IS_IOS } from '../../lib/platform'
import { useNavigate } from '../../navigation'
import { links } from '../../navigation/links'
import { useText } from '../../translations/hook'
import H2 from '../../ui/H2'
import Button from '../../ui/buttons/PresetButton'
import { createThemedStyle } from '../themed'
import { useThemedStyle } from '../themed/hooks'
import Field from './Field'
import { $signUpForm, setMainFieldsCompleted } from './model'
import { ISignUpForm } from './types'
import { validateFirstStepFx } from './validateFields'

const SignUpForm = () => {
  const t = useText()
  const styles = useThemedStyle(themedStyles)
  const navigate = useNavigate()

  const onContinueSignUp = () => {
    navigate(links.countrySelection)
  }

  // sample({
  //   clock: setMainFieldsCompleted,
  //   source: $signUpForm,
  //   target: validateFirstStepFx,
  // })

  return (
    <KeyboardAvoidingView behavior={IS_IOS ? 'padding' : 'height'}>
      <H2 label={t.createNewAccount} style={styles.formTitle} />
      <Field
        placeholder={t.name}
        name={'name'}
        style={[styles.formField, styles.input]}
      />
      <Field
        placeholder={t.lastName}
        name={'lastName'}
        style={[styles.formField, styles.input]}
      />
      <Field
        placeholder={t.birthDate}
        name={'birthDate'}
        style={[styles.formField, styles.input]}
      />
      <Field
        placeholder={t.email}
        name={'email'}
        style={[styles.formField, styles.input, styles.lastFormField]}
      />
      <Button
        label={t.continue}
        // onPress={setMainFieldsCompleted}
        onPress={onContinueSignUp}
        // disabled={false}
        style={[
          styles.button,
          // disabled && styles.button__disabled
        ]}
      />
    </KeyboardAvoidingView>
  )
}

const themedStyles = createThemedStyle((colors) =>
  StyleSheet.create({
    formTitle: {
      textAlign: 'center',
    },
    lastFormField: {},
    formField: {
      marginBottom: 12,
    },
    input: {
      borderColor: colors.inputBorder,
      backgroundColor: colors.inputBackground,
    },
    button: {
      backgroundColor: colors.buttonBackground,
      color: colors.buttonText,
    },
    button__disabled: {
      backgroundColor: colors.buttonBackgroundDisabled,
      color: colors.buttonDisabledLabel,
    },
  })
)

export default SignUpForm
