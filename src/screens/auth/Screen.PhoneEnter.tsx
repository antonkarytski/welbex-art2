import { useStore } from 'effector-react'
import React, { useState } from 'react'
import { KeyboardAvoidingView, StyleSheet } from 'react-native'
import { createStateModel } from 'altek-toolkit'
import SendPhoneButton from '../../features/auth/SendPhoneButton'
import { COUNTRIES_LIST, Country } from '../../features/countries'
import CountryRow from '../../features/countries/CountryRow'
import { useThemedStyleList } from '../../features/themed/hooks'
import { createPhoneInputModel } from '../../lib/componentsModels/phoneNumber/model.phoneNumber'
import { IS_IOS } from '../../lib/helpers/native/constants'
import { buttonPrimaryThemedPreset } from '../../styles/buttons'
import { inputThemedStyles } from '../../styles/inputs'
import { useText } from '../../translations/hook'
import H2 from '../../ui/H2'
import Span from '../../ui/Span'
import CountrySelectablePhoneInput from '../../ui/phoneInput/CountrySelectablePhoneInput'
import { countryModel as prevStageCountryModel } from './Screen.CountrySelection'
import AuthScreenContainer from './stylePresets/AuthScreenContainer'
import { themedCommonStyles } from './stylePresets/styles'

const phoneInputModel = createPhoneInputModel()
const countryModel = createStateModel(COUNTRIES_LIST[0])
const renderCountryRow = (item: Country) => <CountryRow item={item} />

prevStageCountryModel.$state.watch((country) => {
  if (!phoneInputModel.purePhoneModel.$state.getState()) {
    countryModel.set(country)
  }
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
        <CountrySelectablePhoneInput
          phoneModel={phoneInputModel}
          countries={COUNTRIES_LIST}
          renderCountryItem={renderCountryRow}
          selectedCountryModel={countryModel}
          countryCodeExtractor={({ alpha2Code }) => alpha2Code}
          countryLabelExtractor={({ emoji }) => emoji}
          isValid={isPressedToContinue ? isPhoneValid : undefined}
          style={{
            input: styles.input,
            select: { dropdownTab: tabCountryStyles },
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

const tabCountryStyles = StyleSheet.create({
  tabLabel: { fontSize: 20 },
})

export default PhoneEnterScreen
