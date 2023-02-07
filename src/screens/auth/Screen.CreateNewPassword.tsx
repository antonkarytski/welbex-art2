import { useStore } from 'effector-react'
import React from 'react'
import { KeyboardAvoidingView } from 'react-native'
import { setIsAuth } from '../../features/auth/model'
import { useThemedStyleList } from '../../features/themed/hooks'
import { createPasswordFormModel } from '../../lib/componentsModels/passwordsForm/model.passwordsForm'
import { IS_IOS } from '../../lib/helpers/native/constants'
import { buttonPrimaryThemedPreset } from '../../styles/buttons'
import { useText } from '../../translations/hook'
import H2 from '../../ui/H2'
import PasswordInputs from '../../ui/PasswordInputs'
import Span from '../../ui/Span'
import PresetButton from '../../ui/buttons/PresetButton'
import AuthScreenContainer from './stylePresets/AuthScreenContainer'
import { themedCommonStyles } from './stylePresets/styles'

const passwordsModel = createPasswordFormModel()

const NewPasswordScreen = () => {
  const t = useText()
  const { styles } = useThemedStyleList({
    common: themedCommonStyles,
    button: buttonPrimaryThemedPreset,
  })

  const passwords = useStore(passwordsModel.$store)

  const onLogin = () => {
    passwordsModel.validateFx().then((isValid) => {
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
          model={passwordsModel}
          validLabel={t.checkPasswordMatchSuccess}
          invalidLabel={t.checkPasswordMatchError}
        />
      </KeyboardAvoidingView>
      <PresetButton
        label={t.logInButton}
        onPress={onLogin}
        preset={styles.button}
        style={styles.common.bottomButton}
        disabled={!passwords.repeatingPassword || !passwords.password}
      />
    </AuthScreenContainer>
  )
}

export default NewPasswordScreen
