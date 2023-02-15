import { useStore } from 'effector-react'
import React, { useState } from 'react'
import { KeyboardAvoidingView, StyleSheet } from 'react-native'
import UserAgreement, {
  UserAgreementProps,
  userAgreementModel,
} from '../../features/auth/UserAgreement'
import { signUpPasswordsFormModel } from '../../features/signUp/model.passwords'
import { signUp } from '../../features/signUp/request'
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
  const isUserAcceptAgreement = useStore(userAgreementModel.$state)
  const isPasswordsValid = useStore(signUpPasswordsFormModel.validation.$state)
  const [isUserAgreementInvalid, setIsUserAgreementInvalid] =
    useState<UserAgreementProps['isInvalid']>()

  const onCreateAccount = () => {
    if (!isUserAcceptAgreement) {
      return setIsUserAgreementInvalid(true)
    }
    signUpPasswordsFormModel.validation.cast().then((isValid) => {
      if (!isValid) return
      signUp()
        .then((e) => {
          console.log(e)
        })
        .catch((e) => {
          console.log(e.message)
        })
    })
  }

  return (
    <AuthScreenContainer enableScrollView>
      <H2 label={t.enterPassword} style={styles.common.title} />
      <KeyboardAvoidingView behavior={IS_IOS ? 'padding' : 'height'}>
        <PasswordInputs
          model={signUpPasswordsFormModel}
          passwordPlaceholder={t.password}
          repeatPasswordPlaceholder={t.repeatPassword}
          validLabel={t.checkPasswordMatchSuccess}
          invalidLabel={t.checkPasswordMatchError}
          style={{ formWrapper: screenStyles.passwordFormWrapper }}
        />
        <UserAgreement isInvalid={isUserAgreementInvalid} />
      </KeyboardAvoidingView>
      <PresetButton
        disabled={!isUserAcceptAgreement || isPasswordsValid === false}
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
