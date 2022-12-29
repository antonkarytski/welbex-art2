import React from 'react'
import { KeyboardAvoidingView } from 'react-native'
import { useThemedStyleList } from '../../features/themed/hooks'
import { IS_IOS } from '../../lib/platform'
import { useNavigate } from '../../navigation'
import { links } from '../../navigation/links'
import { buttonLightThemedPreset } from '../../styles/buttons'
import { useText } from '../../translations/hook'
import H2 from '../../ui/H2'
import Span from '../../ui/Span'
import PresetButton from '../../ui/buttons/PresetButton'
import AuthScreenContainer from './stylePresets/AuthScreenContainer'
import { themedCommonStyles } from './stylePresets/styles'

export default function Verification() {
  const navigate = useNavigate()
  const t = useText()
  const { styles } = useThemedStyleList({
    common: themedCommonStyles,
    button: buttonLightThemedPreset,
  })

  const onResendCode = () => {
    navigate(links.createPassword) // FOR TESTS
  }

  const onSuccessVerification = () => {
    navigate(links.createPassword)
  }

  return (
    <AuthScreenContainer>
      <H2
        label={t.enterAuthCode}
        style={[styles.common.title, styles.common.describedTitle]}
      />
      <Span
        label={t.enterAuthCode}
        style={styles.common.titleDescription}
        weight={400}
      />
      <KeyboardAvoidingView
        behavior={IS_IOS ? 'padding' : 'height'}
        style={styles.common.flexGrown}
      >
        <PresetButton
          label={t.continue}
          onPress={onResendCode}
          preset={styles.button}
          style={styles.common.bottomButton}
        />
      </KeyboardAvoidingView>
    </AuthScreenContainer>
  )
}
