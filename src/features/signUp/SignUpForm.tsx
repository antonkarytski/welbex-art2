import { sample } from 'effector'
import React from 'react'
import { KeyboardAvoidingView, StyleSheet } from 'react-native'
import { IS_IOS } from '../../lib/platform'
import { useNavigate } from '../../navigation'
import { links } from '../../navigation/links'
import { useText } from '../../translations/hook'
import H2 from '../../ui/H2'
import Button from '../../ui/buttons/PresetButton'
import Field from '../../ui/form/Field'
import { createThemedStyle } from '../themed'
import { useThemedStyle, useThemedStyleList } from '../themed/hooks'
import { $store, setField, signUpFirstPartKeys } from './model'

const SignUpForm = () => {
  const t = useText()
  const { styles } = useThemedStyleList({
    common: themedStyles,
    field: themedFieldStyles,
  })
  const navigate = useNavigate()

  const onContinueSignUp = () => {
    console.log($store.getState())
    navigate(links.countrySelection)
  }

  return (
    <KeyboardAvoidingView behavior={IS_IOS ? 'padding' : 'height'}>
      <H2 label={t.createNewAccount} style={styles.common.formTitle} />

      {signUpFirstPartKeys.map((name) => {
        return (
          <Field
            placeholder={t[name]}
            store={$store}
            setField={setField}
            name={name}
            styles={styles.field}
          />
        )
      })}

      <Button
        label={t.continue}
        onPress={onContinueSignUp}
        // disabled={false}
        style={[
          styles.common.button,
          // disabled && styles.common.button__disabled,
        ]}
        labelStyle={[
          styles.common.button_label,
          // disabled && styles.common.button__disabled_label,
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
    button: {
      backgroundColor: colors.buttonBackground,
      borderColor: colors.buttonBackground,
    },
    button_label: {
      color: colors.buttonText,
    },
    button__disabled: {
      backgroundColor: colors.buttonBackgroundDisabled,
      borderColor: colors.buttonLightBorderDisabled,
    },
    button__disabled_label: {
      color: colors.buttonDisabledLabel,
    },
  })
)

const themedFieldStyles = createThemedStyle((colors) =>
  StyleSheet.create({
    wrapper: {
      marginBottom: 12,
    },
    input: {
      borderColor: colors.inputBorder,
      backgroundColor: colors.inputBackground,
    },
    input__focused: {
      backgroundColor: colors.inputBackground,
    },
  })
)

export default SignUpForm
