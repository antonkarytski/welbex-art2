import React from 'react'
import { KeyboardAvoidingView } from 'react-native'
// import PasswordForm from '../../features/passwordCreating/PasswordForm'
import { useThemedStyleList } from '../../features/themed/hooks'
import { IS_IOS } from '../../lib/helpers/native/constants'
import { buttonPrimaryThemedPreset } from '../../styles/buttons'
import { useText } from '../../translations/hook'
import H2 from '../../ui/H2'
import Span from '../../ui/Span'
import PresetButton from '../../ui/buttons/PresetButton'
import AuthScreenContainer from './stylePresets/AuthScreenContainer'
import { themedCommonStyles } from './stylePresets/styles'

const NewPasswordScreen = () => {
  const t = useText()
  const { styles } = useThemedStyleList({
    common: themedCommonStyles,
    button: buttonPrimaryThemedPreset,
  })

  const onLogin = () => {
    // change isAuth to true
  }

  return (
    <AuthScreenContainer>
      <H2
        label={t.setNewPassword}
        style={[styles.common.title, styles.common.describedTitle]}
      />
      <Span
        label={t.setNewPasswordDescription}
        style={styles.common.titleDescription}
        weight={400}
      />
      <KeyboardAvoidingView
        behavior={IS_IOS ? 'padding' : 'height'}
        style={styles.common.flexGrown}
      >
        {/* <PasswordForm /> */}
        <PresetButton
          label={t.continue}
          onPress={onLogin}
          preset={styles.button}
          style={styles.common.bottomButton}
        />
      </KeyboardAvoidingView>
    </AuthScreenContainer>
  )
}

export default NewPasswordScreen
