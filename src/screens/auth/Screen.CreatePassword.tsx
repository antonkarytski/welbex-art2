import React, { useState } from 'react'
import { KeyboardAvoidingView, StyleSheet } from 'react-native'
import { useStateStore } from 'altek-toolkit'
import UserAgreement, {
  UserAgreementProps,
  userAgreementModel,
} from '../../features/auth/UserAgreement'
import { setIsAuth } from '../../features/auth/model'
import { passwordModel } from '../../features/auth/password/model.passwords'
import { signUp } from '../../features/auth/signUp/request'
import { useThemedStyleList } from '../../features/themed/hooks'
import { noop } from '../../lib/helpers'
import { IS_IOS } from '../../lib/helpers/native/constants'
import { buttonPrimaryThemedPreset } from '../../styles/buttons'
import { useText } from '../../translations/hook'
import H2 from '../../ui/H2'
import PasswordInputs from '../../ui/PasswordInputs'
import PresetButton from '../../ui/buttons/PresetButton'
import AuthScreenContainer from './stylePresets/AuthScreenContainer'
import { themedCommonStyles } from './stylePresets/styles'

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
    if (!isUserAcceptAgreement) {
      return setIsUserAgreementInvalid(true)
    }
    passwordModel.validateFx().then((isValid) => {
      if (!isValid) return
      signUp().catch(noop)
    })
  }

  return (
    <AuthScreenContainer enableScrollView>
      <H2 label={t.enterPassword} style={styles.common.title} />
      <KeyboardAvoidingView behavior={IS_IOS ? 'padding' : 'height'}>
        <PasswordInputs
          passwordPlaceholder={t.password}
          repeatPasswordPlaceholder={t.repeatPassword}
          model={passwordModel}
          validLabel={t.checkPasswordMatchSuccess}
          invalidLabel={t.checkPasswordMatchError}
          style={{ formWrapper: screenStyles.passwordFormWrapper }}
        />
        <UserAgreement isInvalid={isUserAgreementInvalid} />
      </KeyboardAvoidingView>
      <PresetButton
        disabled={!isUserAcceptAgreement}
        label={t.createAccountButton}
        onPress={onCreateAccount}
        preset={styles.button}
        style={styles.common.bottomButton}
      />
    </AuthScreenContainer>
  )
}

const screenStyles = StyleSheet.create({
  passwordFormWrapper: {
    marginBottom: 12,
  },
})

export default CreatePasswordScreen
