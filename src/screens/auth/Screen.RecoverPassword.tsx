import React from 'react'
import { KeyboardAvoidingView } from 'react-native'
import RecoverPasswordForm from '../../features/auth/password/RecoverPasswordForm'
import { recoverPasswordFormModel } from '../../features/auth/password/model.recoverPassword'
import { useThemedStyleList } from '../../features/themed/hooks'
import { IS_IOS } from '../../lib/helpers/native/constants'
import { buttonPrimaryThemedPreset } from '../../styles/buttons'
import { useText } from '../../translations/hook'
import H2 from '../../ui/H2'
import Span from '../../ui/Span'
import PresetButton from '../../ui/buttons/PresetButton'
import AuthScreenContainer from './stylePresets/AuthScreenContainer'
import { themedCommonStyles } from './stylePresets/styles'

export default function PasswordRecover() {
  const t = useText()
  const { styles } = useThemedStyleList({
    common: themedCommonStyles,
    button: buttonPrimaryThemedPreset,
  })

  return (
    <AuthScreenContainer>
      <H2
        label={t.recoverPassword}
        style={[styles.common.title, styles.common.describedTitle]}
      />
      <Span
        label={t.recoverPasswordDescription}
        style={styles.common.titleDescription}
        weight={400}
      />
      <KeyboardAvoidingView behavior={IS_IOS ? 'padding' : 'height'}>
        <RecoverPasswordForm />
      </KeyboardAvoidingView>
      <PresetButton
        label={t.resetPasswordButton}
        onPress={recoverPasswordFormModel.submit}
        preset={styles.button}
        style={styles.common.bottomButton}
      />
    </AuthScreenContainer>
  )
}
