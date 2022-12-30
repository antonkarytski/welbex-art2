import React from 'react'
import { KeyboardAvoidingView } from 'react-native'
import { useThemedStyleList } from '../../features/themed/hooks'
import { IS_IOS } from '../../lib/helpers/native/constants'
import { useNavigate } from '../../navigation'
import { links } from '../../navigation/links'
import { buttonPrimaryThemedPreset } from '../../styles/buttons'
import { useText } from '../../translations/hook'
import H2 from '../../ui/H2'
import Span from '../../ui/Span'
import PresetButton from '../../ui/buttons/PresetButton'
import AuthScreenContainer from './stylePresets/AuthScreenContainer'
import { themedCommonStyles } from './stylePresets/styles'

const PhoneEnterScreen = () => {
  const navigate = useNavigate()
  const t = useText()
  const { styles } = useThemedStyleList({
    common: themedCommonStyles,
    button: buttonPrimaryThemedPreset,
  })

  const onContinue = () => {
    navigate(links.verification)
  }

  return (
    <AuthScreenContainer>
      <H2
        label={t.enterPhoneNumber}
        style={[styles.common.title, styles.common.describedTitle]}
      />
      <Span
        label={t.enterPhoneDescription}
        style={styles.common.titleDescription}
        weight={400}
      />
      <KeyboardAvoidingView
        behavior={IS_IOS ? 'padding' : 'height'}
        style={styles.common.flexGrown}
      >
        <PresetButton
          label={t.continue}
          onPress={onContinue}
          preset={styles.button}
          style={styles.common.bottomButton}
        />
      </KeyboardAvoidingView>
    </AuthScreenContainer>
  )
}
export default PhoneEnterScreen
