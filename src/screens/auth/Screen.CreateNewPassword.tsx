import { useStore } from 'effector-react'
import React from 'react'
import { KeyboardAvoidingView } from 'react-native'
import { setIsAuth } from '../../features/auth/model'
import { newPasswordModel } from '../../features/auth/password/model.passwords'
import { useThemedStyleList } from '../../features/themed/hooks'
import { IS_IOS } from '../../lib/helpers/native/constants'
import { buttonPrimaryThemedPreset } from '../../styles/buttons'
import { useText } from '../../translations/hook'
import H2 from '../../ui/H2'
import PasswordInputs from '../../ui/PasswordInputs'
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

  const passwords = useStore(newPasswordModel.$store)

  const onLogin = () => {
    newPasswordModel.validation.cast().then((isValid) => {
      if (isValid) setIsAuth(true) // TEST
    })
  }

  return (
    <AuthScreenContainer enableScrollView>
      <H2
        label={t.setNewPassword}
        style={[styles.common.title, styles.common.describedTitle]}
      />
      <Span
        label={t.setNewPasswordDescription}
        style={styles.common.titleDescription}
        weight={400}
      />
      <KeyboardAvoidingView behavior={IS_IOS ? 'padding' : 'height'}>
        <PasswordInputs
          passwordPlaceholder={t.password}
          repeatPasswordPlaceholder={t.repeatPassword}
          model={newPasswordModel}
          validLabel={t.checkPasswordMatchSuccess}
          invalidLabel={t.checkPasswordMatchError}
        />
      </KeyboardAvoidingView>
      <PresetButton
        label={t.logInButton}
        onPress={onLogin}
        preset={styles.button}
        style={styles.common.bottomButton}
        disabled={!passwords.passwordConfirmation || !passwords.password}
      />
    </AuthScreenContainer>
  )
}

export default NewPasswordScreen
