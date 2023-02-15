import React from 'react'
import { KeyboardAvoidingView } from 'react-native'
import PhoneEnter from '../../features/signUp/phone'
import SendPhoneButton from '../../features/signUp/phone/SendPhoneButton'
import { useThemedStyleList } from '../../features/themed/hooks'
import { IS_IOS } from '../../lib/helpers/native/constants'
import { buttonPrimaryThemedPreset } from '../../styles/buttons'
import { useText } from '../../translations/hook'
import H2 from '../../ui/H2'
import Span from '../../ui/Span'
import AuthScreenContainer from './stylePresets/AuthScreenContainer'
import { themedCommonStyles } from './stylePresets/styles'

const PhoneEnterScreen = () => {
  const t = useText()
  const { styles } = useThemedStyleList({
    common: themedCommonStyles,
    button: buttonPrimaryThemedPreset,
  })

  return (
    <AuthScreenContainer enableScrollView>
      <H2
        label={t.enterPhoneNumber}
        style={[styles.common.title, styles.common.describedTitle]}
      />
      <Span
        label={t.enterPhoneDescription}
        style={styles.common.titleDescription}
        weight={400}
      />
      <KeyboardAvoidingView behavior={IS_IOS ? 'padding' : 'height'}>
        <PhoneEnter />
      </KeyboardAvoidingView>
      <SendPhoneButton preset={styles.button} />
    </AuthScreenContainer>
  )
}

export default PhoneEnterScreen
