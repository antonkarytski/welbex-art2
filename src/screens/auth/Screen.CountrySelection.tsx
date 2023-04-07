import { useStoreMap } from 'effector-react'
import React from 'react'
import { KeyboardAvoidingView, StyleSheet } from 'react-native'
import { useQuickAuthNextStep } from '../../features/auth/quick/hooks'
import CountriesList from '../../features/signUp/country/CountriesList'
import { signUpCountryModel } from '../../features/signUp/country/model'
import { useThemedStyleList } from '../../features/themed/hooks'
import { IS_IOS } from '../../lib/helpers/native/constants'
import { useNavigate } from '../../navigation'
import { links } from '../../navigation/links'
import { buttonPrimaryThemedPreset } from '../../styles/buttons'
import { useText } from '../../translations/hook'
import H2 from '../../ui/H2'
import PresetButton from '../../ui/buttons/PresetButton'
import AuthScreenContainer from './stylePresets/AuthScreenContainer'
import { themedCommonStyles } from './stylePresets/styles'

const CountrySelectionScreen = () => {
  const navigate = useNavigate()
  const t = useText()
  const quickAuth = useQuickAuthNextStep(links.countrySelection)
  const isCountrySelected = useStoreMap({
    store: signUpCountryModel.$state,
    keys: [],
    fn: (state) => !!state,
  })
  const { styles } = useThemedStyleList({
    common: themedCommonStyles,
    button: buttonPrimaryThemedPreset,
  })

  const onContinue = () => {
    if (quickAuth.isActive) return quickAuth.nextStep()
    navigate(links.phoneEnter)
  }
  return (
    <AuthScreenContainer>
      <H2 label={t.chooseCountry} style={styles.common.title} />
      <KeyboardAvoidingView
        behavior={IS_IOS ? 'padding' : 'height'}
        style={screenStyles.listContainer}
      >
        <CountriesList />
      </KeyboardAvoidingView>
      <PresetButton
        label={t.continue}
        onPress={onContinue}
        preset={styles.button}
        disabled={!isCountrySelected}
      />
    </AuthScreenContainer>
  )
}

const screenStyles = StyleSheet.create({
  listContainer: {
    flex: 1,
    paddingBottom: 16,
  },
})

export default CountrySelectionScreen
