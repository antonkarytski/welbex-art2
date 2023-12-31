import { useStore } from 'effector-react'
import React, { useState } from 'react'
import { KeyboardAvoidingView, StyleSheet } from 'react-native'
import { useStateStore } from 'altek-toolkit'
import UserAgreement, {
  UserAgreementProps,
  userAgreementModel,
} from '../../features/auth/UserAgreement'
import { usePasswordsError } from '../../features/auth/password/hooks'
import { signUpPasswordsFormModel } from '../../features/signUp/model.passwords'
import { signUp, signUpErrorModel } from '../../features/signUp/request'
import { useThemedStyleList } from '../../features/themed/hooks'
import { noop } from '../../lib/helpers'
import { IS_IOS } from '../../lib/helpers/native/constants'
import { buttonPrimaryThemedPreset } from '../../styles/buttons'
import { errorTextThemedStyles } from '../../styles/text'
import { useText } from '../../translations/hook'
import H2 from '../../ui/H2'
import PasswordInputs from '../../ui/PasswordInputs'
import Span from '../../ui/Span'
import AsyncPresetButton from '../../ui/buttons/AsyncPresetButton'
import AuthScreenContainer from './stylePresets/AuthScreenContainer'
import { themedCommonStyles } from './stylePresets/styles'

const CreatePasswordScreen = () => {
  const t = useText()
  const { styles, colors } = useThemedStyleList({
    common: themedCommonStyles,
    button: buttonPrimaryThemedPreset,
  })
  const isUserAcceptAgreement = useStore(userAgreementModel.$state)
  const isPasswordsValid = useStore(signUpPasswordsFormModel.validation.$state)
  const [isUserAgreementInvalid, setIsUserAgreementInvalid] =
    useState<UserAgreementProps['isInvalid']>()
  const isLoading = useStore(signUp.pending)
  const [passwordError, updatePasswordError] = usePasswordsError()
  const [signUpError] = useStateStore(signUpErrorModel)

  const onCreateAccount = () => {
    if (!isUserAcceptAgreement) {
      return setIsUserAgreementInvalid(true)
    }
    signUpPasswordsFormModel.validation
      .cast()
      .then((validation) => {
        if (validation.isValid) return signUp()
        updatePasswordError(validation.list)
      })
      .catch(noop)
  }

  const onAfterGoBack = () => {
    signUpErrorModel.reset()
  }

  return (
    <AuthScreenContainer enableScrollView onAfterGoBack={onAfterGoBack}>
      <H2 label={t.enterPassword} style={styles.common.title} />
      <KeyboardAvoidingView behavior={IS_IOS ? 'padding' : 'height'}>
        <PasswordInputs
          model={signUpPasswordsFormModel}
          passwordPlaceholder={t.password}
          repeatPasswordPlaceholder={t.repeatPassword}
          validLabel={t.checkPasswordMatchSuccess}
          invalidLabel={passwordError}
          style={{ formWrapper: screenStyles.passwordFormWrapper }}
        />
        <UserAgreement isInvalid={isUserAgreementInvalid} />
        {signUpError && (
          <Span
            label={signUpError}
            style={[errorTextThemedStyles(colors), screenStyles.signUpError]}
          />
        )}
      </KeyboardAvoidingView>
      <AsyncPresetButton
        isLoading={isLoading}
        disabled={!isUserAcceptAgreement || isPasswordsValid === false}
        label={t.createAccountButton}
        onPress={onCreateAccount}
        preset={styles.button}
        style={styles.common.bottomButton}
        loaderColor={colors.whiteText}
      />
    </AuthScreenContainer>
  )
}

const screenStyles = StyleSheet.create({
  passwordFormWrapper: {
    marginBottom: 12,
  },
  signUpError: {
    marginVertical: 16,
    fontSize: 16,
    textAlign: 'center',
  },
})

export default CreatePasswordScreen
