import { sample } from 'effector'
import { useStore } from 'effector-react'
import React, { useState } from 'react'
import { KeyboardAvoidingView } from 'react-native'
import PhoneEnter, {
  countryModel,
  phoneInputModel,
} from '../../features/auth/PhoneEnter'
import SendPhoneButton from '../../features/auth/SendPhoneButton'
import { useThemedStyleList } from '../../features/themed/hooks'
import { IS_IOS } from '../../lib/helpers/native/constants'
import { buttonPrimaryThemedPreset } from '../../styles/buttons'
import { inputThemedStyles } from '../../styles/inputs'
import { useText } from '../../translations/hook'
import H2 from '../../ui/H2'
import Span from '../../ui/Span'
import { countryModel as prevStageCountryModel } from './Screen.CountrySelection'
import AuthScreenContainer from './stylePresets/AuthScreenContainer'
import { themedCommonStyles } from './stylePresets/styles'

sample({
  clock: prevStageCountryModel.set,
  source: {
    prevStageCountry: prevStageCountryModel.$state,
    country: phoneInputModel.purePhoneModel.$state,
  },
  filter: ({ country }) => !country,
  fn: ({ prevStageCountry }) => prevStageCountry,
  target: countryModel.set,
})

const PhoneEnterScreen = () => {
  const t = useText()
  const { styles } = useThemedStyleList({
    common: themedCommonStyles,
    button: buttonPrimaryThemedPreset,
    input: inputThemedStyles,
  })

  const isPhoneValid = useStore(phoneInputModel.$isPhoneValid)
  const [isPressedToContinue, setIsPressedToContinue] = useState(false)

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
        <PhoneEnter
          isValid={isPressedToContinue ? isPhoneValid : undefined}
          style={{
            input: styles.input,
          }}
        />
        <SendPhoneButton
          buttonPreset={styles.button}
          setIsPressedToContinue={setIsPressedToContinue}
          phoneInputModel={phoneInputModel}
        />
      </KeyboardAvoidingView>
    </AuthScreenContainer>
  )
}

export default PhoneEnterScreen
