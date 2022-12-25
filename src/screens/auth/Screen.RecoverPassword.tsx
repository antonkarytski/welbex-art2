import React from 'react'
import { useThemedStyleList } from '../../features/themed/hooks'
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

  const onResetPassword = () => {}

  return (
    <AuthScreenContainer>
      <H2 label={t.recoverPassword} style={styles.common.title} />
      <Span
        label={t.recoverPasswordDescription}
        style={styles.common.titleDescription}
        weight={400}
      />
      <PresetButton
        label={t.resetPasswordButton}
        onPress={onResetPassword}
        preset={styles.button}
      />
    </AuthScreenContainer>
  )
}
