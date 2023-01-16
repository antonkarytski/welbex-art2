import { useEvent, useStore } from 'effector-react'
import React from 'react'
import { KeyboardAvoidingView } from 'react-native'
import { setIsAuth } from '../../features/auth/model'
import { useThemedStyleList } from '../../features/themed/hooks'
import { createPasswordFormModel } from '../../lib/componentsModels/passwordsForm/model.passwordsForm'
import { IS_IOS } from '../../lib/helpers/native/constants'
import { buttonPrimaryThemedPreset } from '../../styles/buttons'
import { useText } from '../../translations/hook'
// import CheckBox from '../../ui/CheckBox'
import H2 from '../../ui/H2'
import PasswordInputs from '../../ui/PasswordInputs'
import Span from '../../ui/Span'
import PresetButton from '../../ui/buttons/PresetButton'
import AuthScreenContainer from './stylePresets/AuthScreenContainer'
import { themedCommonStyles } from './stylePresets/styles'

const { passwordsModel, arePasswordsValidModel } = createPasswordFormModel()

const CreatePasswordScreen = () => {
  const t = useText()
  const { styles } = useThemedStyleList({
    common: themedCommonStyles,
    button: buttonPrimaryThemedPreset,
  })
  const setIsAuthenticated = useEvent(setIsAuth)
  const arePasswordsValid = useStore(arePasswordsValidModel.$store)
  const setArePasswordsValid = useEvent(arePasswordsValidModel.set)

  const onCreateAccount = () => {
    setArePasswordsValid().then((res) => {
      console.log('setArePasswordsValid', res)
      setIsAuthenticated(true)
    })
    console.log('passwordInputsModel', passwordsModel.$store.getState())
  }

  return (
    <AuthScreenContainer>
      <H2 label={t.enterPassword} style={[styles.common.title]} />

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

export default CreatePasswordScreen
