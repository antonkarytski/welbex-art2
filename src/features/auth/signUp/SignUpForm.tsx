import React from 'react'
import { KeyboardAvoidingView, StyleSheet } from 'react-native'
import { IS_IOS } from '../../../lib/helpers/native/constants'
import { useNavigate } from '../../../navigation'
import { links } from '../../../navigation/links'
import { buttonPrimaryThemedPreset } from '../../../styles/buttons'
import { inputThemedStyles } from '../../../styles/inputs'
import { useText } from '../../../translations/hook'
import H2 from '../../../ui/H2'
import Button from '../../../ui/buttons/PresetButton'
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
  // const [isAbleToContinue, setIsAbleToContinue] = useState(false)
  const onContinueSignUp = () => {
    navigate(links.countrySelection)
  }

  return (
    <>
      <KeyboardAvoidingView behavior={IS_IOS ? 'padding' : undefined}>
        <H2 label={t.createNewAccount} style={featureStyles.formTitle} />
        {signUpFormModel.mapKeys((name) => {
          return (
            <Field
              key={name}
              placeholder={t[name]}
              formModel={signUpFormModel}
              name={name}
              style={styles.field}
            />
          )
        })}
      </KeyboardAvoidingView>
      <Button
        label={t.continue}
        onPress={onContinueSignUp}
        preset={styles.button}
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
