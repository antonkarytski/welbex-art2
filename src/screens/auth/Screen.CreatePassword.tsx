import React, { useState } from 'react'
import { KeyboardAvoidingView, StyleSheet } from 'react-native'
import { useStateStore } from 'altek-toolkit'
import UserAgreement, {
  UserAgreementProps,
  userAgreementModel,
} from '../../features/auth/UserAgreement'
import { setIsAuth } from '../../features/auth/model'
import { useThemedStyleList } from '../../features/themed/hooks'
import { createPasswordFormModel } from '../../lib/componentsModels/passwordsForm/model.passwordsForm'
import { IS_IOS } from '../../lib/helpers/native/constants'
import { buttonPrimaryThemedPreset } from '../../styles/buttons'
import { useText } from '../../translations/hook'
import H2 from '../../ui/H2'
import PasswordInputs from '../../ui/PasswordInputs'
import PresetButton from '../../ui/buttons/PresetButton'
import AuthScreenContainer from './stylePresets/AuthScreenContainer'
import { themedCommonStyles } from './stylePresets/styles'

const passwordsModel = createPasswordFormModel()

const CreatePasswordScreen = () => {
  const t = useText()
  const { styles } = useThemedStyleList({
    common: themedCommonStyles,
    button: buttonPrimaryThemedPreset,
  })
  const [isUserAcceptAgreement] = useStateStore(userAgreementModel)
  const [isUserAgreementInvalid, setIsUserAgreementInvalid] =
    useState<UserAgreementProps['isInvalid']>()

  const onCreateAccount = () => {
    passwordsModel.validateFx().then((isValid) => {
      if (!isUserAcceptAgreement) {
        setIsUserAgreementInvalid(true)
        return
      }
      if (isValid && isUserAcceptAgreement) {
        setIsAuth(true)
      }
    })
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
          validLabel={t.checkPasswordMatchSuccess}
          invalidLabel={t.checkPasswordMatchError}
          style={{ formWrapper: screenStyles.passwordFormWrapper }}
        />
        <UserAgreement isInvalid={isUserAgreementInvalid} />
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

const screenStyles = StyleSheet.create({
  passwordFormWrapper: {
    marginBottom: 12,
  },
})

export default CreatePasswordScreen
