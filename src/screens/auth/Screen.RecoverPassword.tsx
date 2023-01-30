import { useStore } from 'effector-react'
import React from 'react'
import { KeyboardAvoidingView } from 'react-native'
import RecoverPasswordForm from '../../features/auth/recoverPassword/RecoverPasswordForm'
import { recoverPasswordFormModel } from '../../features/auth/recoverPassword/model.recoverPassword'
import PopUpRecoverPassword from '../../features/popUp/authPopUps/PopUp.RecoverPassword'
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

  const { email } = useStore(recoverPasswordFormModel.$store)

  const onResetPassword = () => {
    // TODO: correct according to requests

    // API_request.then(() => {
    PopUpRecoverPassword.showSync({ props: { email } })
    // })
    // TODO: (links.createNewPassword) --- на эту страницу должен быть переход из имэйл сообщения
  }

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
      <KeyboardAvoidingView
        behavior={IS_IOS ? 'padding' : 'height'}
        style={styles.common.flexGrown}
      >
        <RecoverPasswordForm />
        <PresetButton
          label={t.resetPasswordButton}
          onPress={onResetPassword}
          preset={styles.button}
          style={styles.common.bottomButton}
        />
      </KeyboardAvoidingView>
    </AuthScreenContainer>
  )
}
