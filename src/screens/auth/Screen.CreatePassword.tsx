import React from 'react'
import { KeyboardAvoidingView } from 'react-native'
import { useThemedStyleList } from '../../features/themed/hooks'
import { IS_IOS } from '../../lib/platform'
import { buttonPrimaryThemedPreset } from '../../styles/buttons'
import { useText } from '../../translations/hook'
// import CheckBox from '../../ui/CheckBox'
import H2 from '../../ui/H2'
import Span from '../../ui/Span'
import PresetButton from '../../ui/buttons/PresetButton'
import AuthScreenContainer from './stylePresets/AuthScreenContainer'
import { themedCommonStyles } from './stylePresets/styles'

const PasswordEnterScreen = () => {
  const t = useText()
  const { styles } = useThemedStyleList({
    common: themedCommonStyles,
    button: buttonPrimaryThemedPreset,
  })

  const onCreateAccount = () => {
    // change isAuth state to true
  }

  return (
    <AuthScreenContainer>
      <H2 label={t.enterPassword} style={[styles.common.title]} />

      <KeyboardAvoidingView
        behavior={IS_IOS ? 'padding' : 'height'}
        style={styles.common.flexGrown}
      >
        {/* <CheckBox label={'hello'} value={'l'} onChange={() => {}} /> */}

        <PresetButton
          label={t.createAccountButton}
          onPress={onCreateAccount}
          preset={styles.button}
          style={styles.common.bottomButton}
        />
      </KeyboardAvoidingView>
    </AuthScreenContainer>
  )
}

export default PasswordEnterScreen
