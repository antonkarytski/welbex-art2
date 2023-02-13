import { useStore } from 'effector-react'
import React from 'react'
import { KeyboardAvoidingView, StyleSheet } from 'react-native'
import { IS_IOS } from '../../../lib/helpers/native/constants'
import { useNavigate } from '../../../navigation'
import { buttonPrimaryThemedPreset } from '../../../styles/buttons'
import { inputThemedStyles } from '../../../styles/inputs'
import { useText } from '../../../translations/hook'
import H2 from '../../../ui/H2'
import Button from '../../../ui/buttons/PresetButton'
import DateField from '../../../ui/form/DateField'
import Field from '../../../ui/form/Field'
import { useThemedStyleList } from '../../themed/hooks'
import { signUpFormModel } from './model'

const SignUpForm = () => {
  const t = useText()
  const { styles } = useThemedStyleList({
    field: inputThemedStyles,
    button: buttonPrimaryThemedPreset,
  })
  const navigate = useNavigate()
  const isFormValid = useStore(signUpFormModel.validation.$state)

  const onContinueSignUp = () => {
    signUpFormModel.validation.cast()
    //navigate(links.countrySelection)
  }

  console.log(isFormValid)

  return (
    <>
      <KeyboardAvoidingView behavior={IS_IOS ? 'padding' : undefined}>
        <H2 label={t.createNewAccount} style={featureStyles.formTitle} />
        {signUpFormModel.mapKeys((name) => {
          if (name === 'birthDate') {
            return (
              <DateField
                key={name}
                placeholder={t.birthDate}
                formModel={signUpFormModel}
                name={name}
                style={styles.field}
              />
            )
          }
          return (
            <Field
              validateOnBlur
              key={name}
              placeholder={t[name]}
              formModel={signUpFormModel}
              name={name}
              style={styles.field}
              type={name === 'email' ? 'email-address' : 'default'}
            />
          )
        })}
      </KeyboardAvoidingView>
      <Button
        label={t.continue}
        onPress={onContinueSignUp}
        preset={styles.button}
        disabled={isFormValid === false}
      />
    </>
  )
}

const featureStyles = StyleSheet.create({
  formTitle: {
    textAlign: 'center',
  },
})

export default SignUpForm
