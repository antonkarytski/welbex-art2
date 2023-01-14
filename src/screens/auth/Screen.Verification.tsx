import React from 'react'
import { KeyboardAvoidingView } from 'react-native'
import CodeVerification from '../../features/auth/codeVerification/CodeVerification'
import { useThemedStyleList } from '../../features/themed/hooks'
import { IS_IOS } from '../../lib/helpers/native/constants'
import { buttonLightThemedPreset } from '../../styles/buttons'
import { useText } from '../../translations/hook'
import H2 from '../../ui/H2'
import Span from '../../ui/Span'
import PresetButton from '../../ui/buttons/PresetButton'
import AuthScreenContainer from './stylePresets/AuthScreenContainer'
import { themedCommonStyles } from './stylePresets/styles'

export default function Verification() {
  const t = useText()
  const { styles } = useThemedStyleList({
    common: themedCommonStyles,
    button: buttonLightThemedPreset,
  })

  const onResendCode = () => {}

  return (
    <AuthScreenContainer>
      <H2
        label={t.enterAuthCode}
        style={[styles.common.title, styles.common.describedTitle]}
      />
      <Span
        label={t.enterAuthCodeDescription}
        style={styles.common.titleDescription}
        weight={400}
      />
      <KeyboardAvoidingView
        behavior={IS_IOS ? 'padding' : 'height'}
        style={styles.common.flexGrown}
      >
        <CodeVerification />
        <PresetButton
          label={t.resendCode}
          onPress={onResendCode}
          preset={styles.button}
          style={styles.common.bottomButton}
        />
      </KeyboardAvoidingView>
    </AuthScreenContainer>
  )
}
