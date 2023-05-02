import React, { useCallback } from 'react'
import { StyleSheet } from 'react-native'
import { IS_ANDROID } from '../../../lib/helpers/native/constants'
import { createSearchableListModel } from '../../../lib/models/model.search'
import { FONT_MEDIUM } from '../../../styles/fonts'
import { inputThemedStyles } from '../../../styles/inputs'
import ListSelect from '../../../ui/selects/ListSelect'
import { COUNTRIES_LIST, Country, countyNameExtractor } from '../../countries'
import CountryRow from '../../countries/CountryRow'
import { createThemedStyle } from '../../themed'
import { useThemedStyleList } from '../../themed/hooks'
import { signUpCountryModel } from './model'

const searchModel = createSearchableListModel<Country>({
  filterExtractor: countyNameExtractor,
})

const countryIdExtractor = ({ alpha3Code }: Country) => alpha3Code

const CountriesList = () => {
  const { styles } = useThemedStyleList({
    countryRow: countryRowThemedStyles,
    input: inputThemedStyles,
  })

  const renderCountryRow = useCallback(
    (item: Country) => <CountryRow item={item} style={styles.countryRow} />,
    [styles]
  )

  return (
    <ListSelect
      data={COUNTRIES_LIST}
      idExtractor={countryIdExtractor}
      searchModel={searchModel}
      model={signUpCountryModel}
      renderItem={renderCountryRow}
      style={{
        item: listItemStyles,
        searchInput: styles.input,
      }}
    />
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
    text: {
      color: IS_ANDROID ? '#000' : undefined,
    },
  })
)

const listItemStyles = StyleSheet.create({
  icon_checkMark__wrapper: {
    right: -40,
  },
})

export default CountriesList
