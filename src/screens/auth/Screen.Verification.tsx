import React from 'react'
import { KeyboardAvoidingView } from 'react-native'
import CodeVerification from '../../features/auth/codeVerification/CodeVerification'
import ResendCode from '../../features/auth/resendCode/ResendCode'
import { useThemedStyle } from '../../features/themed/hooks'
import { IS_IOS } from '../../lib/helpers/native/constants'
import { useText } from '../../translations/hook'
import H2 from '../../ui/H2'
import Span from '../../ui/Span'
import AuthScreenContainer from './stylePresets/AuthScreenContainer'
import { themedCommonStyles } from './stylePresets/styles'

export default function Verification() {
  const t = useText()
  const styles = useThemedStyle(themedCommonStyles)

  return (
    <AuthScreenContainer>
      <H2
        label={t.enterAuthCode}
        style={[styles.title, styles.describedTitle]}
      />
      <Span
        label={t.enterAuthCodeDescription}
        style={styles.titleDescription}
        weight={400}
      />
      <KeyboardAvoidingView behavior={IS_IOS ? 'padding' : 'height'}>
        <CodeVerification />
      </KeyboardAvoidingView>
      <ResendCode />
    </AuthScreenContainer>
  )
}
