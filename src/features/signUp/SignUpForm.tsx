import { sample } from 'effector'
import React, { useState } from 'react'
// import { Keyboard, TouchableWithoutFeedback } from 'react-native'
import { KeyboardAvoidingView } from 'react-native'
import { IS_IOS } from '../../lib/platform'
import { useNavigate } from '../../navigation'
import { links } from '../../navigation/links'
import { useText } from '../../translations/hook'
import H2 from '../../ui/H2'
import Button from '../../ui/buttons/PresetButton'
import Field from '../../ui/form/Field'
import { useThemedStyleList } from '../themed/hooks'
import { SIGN_UP_FIRST_PART_KEYS, signUpFormModel } from './model'
import { featureStyles, themedButtonPreset, themedFieldStyles } from './styles'

const SignUpForm = () => {
  const t = useText()
  const { styles } = useThemedStyleList({
    field: themedFieldStyles,
    button: themedButtonPreset,
  })
  const navigate = useNavigate()

  // const [isAbleToContinue, setIsAbleToContinue] = useState(false)

  const onContinueSignUp = () => {
    console.log(signUpFormModel.$store.getState())
    navigate(links.countrySelection)
  }

  return (
    <KeyboardAvoidingView behavior={IS_IOS ? 'padding' : 'height'}>
      <H2 label={t.createNewAccount} style={featureStyles.formTitle} />

      {SIGN_UP_FIRST_PART_KEYS.map((name) => {
        return (
          <Field
            placeholder={t[name]}
            formModel={signUpFormModel}
            name={name}
            styles={styles.field}
          />
        )
      })}

      <Button
        label={t.continue}
        onPress={onContinueSignUp}
        preset={styles.button}
      />
    </KeyboardAvoidingView>
  )
}

export default SignUpForm
