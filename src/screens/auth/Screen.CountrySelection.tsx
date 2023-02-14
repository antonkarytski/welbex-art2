import { useStore } from 'effector-react'
import React, { useCallback } from 'react'
import { KeyboardAvoidingView, StyleSheet } from 'react-native'
import {
  COUNTRIES_LIST,
  Country,
  countyNameExtractor,
} from '../../features/countries'
import CountryRow from '../../features/countries/CountryRow'
import { userCountrySignUpModel } from '../../features/signUp/model.country'
import { createThemedStyle } from '../../features/themed'
import { useThemedStyleList } from '../../features/themed/hooks'
import { IS_IOS } from '../../lib/helpers/native/constants'
import { createSearchableListModel } from '../../lib/models/model.search'
import { useNavigate } from '../../navigation'
import { links } from '../../navigation/links'
import { buttonPrimaryThemedPreset } from '../../styles/buttons'
import { FONT_MEDIUM } from '../../styles/fonts'
import { useText } from '../../translations/hook'
import H2 from '../../ui/H2'
import PresetButton from '../../ui/buttons/PresetButton'
import ListSelect from '../../ui/selects/ListSelect'
import AuthScreenContainer from './stylePresets/AuthScreenContainer'
import { themedCommonStyles } from './stylePresets/styles'

const searchModel = createSearchableListModel<Country>({
  filterExtractor: countyNameExtractor,
})
const countryIdExtractor = ({ alpha3Code }: Country) => alpha3Code

const CountrySelectionScreen = () => {
  const navigate = useNavigate()
  const t = useText()
  const country = useStore(userCountrySignUpModel.$state)
  const { styles } = useThemedStyleList({
    common: themedCommonStyles,
    button: buttonPrimaryThemedPreset,
    countryRow: countryRowThemedStyles,
  })

  const onContinue = () => {
    navigate(links.phoneEnter)
  }

  const renderCountryRow = useCallback(
    (item: Country) => <CountryRow item={item} style={styles.countryRow} />,
    [styles]
  )

  return (
    <AuthScreenContainer>
      <H2 label={t.chooseCountry} style={styles.common.title} />
      <KeyboardAvoidingView behavior={IS_IOS ? 'padding' : 'height'}>
        <ListSelect
          data={COUNTRIES_LIST}
          idExtractor={countryIdExtractor}
          searchModel={searchModel}
          model={userCountrySignUpModel}
          renderItem={renderCountryRow}
        />
      </KeyboardAvoidingView>
      <PresetButton
        label={t.continue}
        onPress={onContinue}
        preset={styles.button}
        style={styles.common.bottomButton}
        disabled={!country}
      />
    </AuthScreenContainer>
  )
}

const countryRowThemedStyles = createThemedStyle((colors) =>
  StyleSheet.create({
    name: {
      color: colors.text,
      fontFamily: FONT_MEDIUM,
      fontSize: 16,
      lineHeight: 19,
    },
  })
)

export default CountrySelectionScreen
