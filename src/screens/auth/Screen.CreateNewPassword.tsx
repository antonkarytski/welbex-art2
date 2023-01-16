import { useEvent, useStore } from 'effector-react'
import React from 'react'
import { KeyboardAvoidingView } from 'react-native'
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

const { passwordsModel, arePasswordsValidModel } = createPasswordFormModel()

const NewPasswordScreen = () => {
  const t = useText()
  const { styles } = useThemedStyleList({
    common: themedCommonStyles,
    button: buttonPrimaryThemedPreset,
  })

  const arePasswordsValid = useStore(arePasswordsValidModel.$store)
  const setArePasswordsValid = useEvent(arePasswordsValidModel.set)

  const onLogin = () => {
    setArePasswordsValid().then((res) => {
      //
    })
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
        <PasswordInputs
          passwordPlaceholder={t.password}
          repeatPasswordPlaceholder={t.repeatPassword}
          model={passwordsModel}
          areValid={arePasswordsValid}
          validLabel={t.checkPasswordMatchSuccess}
          invalidLabel={t.checkPasswordMatchError}
        />
        <PresetButton
          label={t.logInButton}
          onPress={onLogin}
          preset={styles.button}
          style={styles.common.bottomButton}
        />
      </KeyboardAvoidingView>
    </AuthScreenContainer>
  )
}

export default NewPasswordScreen
