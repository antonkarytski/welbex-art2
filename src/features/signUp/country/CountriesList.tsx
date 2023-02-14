import React, { useCallback } from 'react'
import { StyleSheet } from 'react-native'
import { createSearchableListModel } from '../../../lib/models/model.search'
import { FONT_MEDIUM } from '../../../styles/fonts'
import ListSelect from '../../../ui/selects/ListSelect'
import { COUNTRIES_LIST, Country, countyNameExtractor } from '../../countries'
import CountryRow from '../../countries/CountryRow'
import { createThemedStyle } from '../../themed'
import { useThemedStyle } from '../../themed/hooks'
import { userCountrySignUpModel } from './model'

type CountriesListProps = {}

const searchModel = createSearchableListModel<Country>({
  filterExtractor: countyNameExtractor,
})
const countryIdExtractor = ({ alpha3Code }: Country) => alpha3Code

const CountriesList = ({}: CountriesListProps) => {
  const countryRowStyles = useThemedStyle(countryRowThemedStyles)

  const renderCountryRow = useCallback(
    (item: Country) => <CountryRow item={item} style={countryRowStyles} />,
    [countryRowStyles]
  )

  return (
    <ListSelect
      data={COUNTRIES_LIST}
      idExtractor={countryIdExtractor}
      searchModel={searchModel}
      model={userCountrySignUpModel}
      renderItem={renderCountryRow}
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
  })
)

export default CountriesList
