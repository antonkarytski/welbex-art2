import React from 'react'
import { StyleSheet } from 'react-native'
import { StateModel } from 'altek-toolkit'
import { SearchableListModel } from '../../lib/models/model.search'
import { FONT_MEDIUM } from '../../styles/fonts'
import { useDropdownSelectPreset } from '../../styles/selects'
import { useText } from '../../translations/hook'
import DropdownSelect from '../../ui/selects/DropdownSelect'
import { RenderItem } from '../../ui/selects/selectItem/types'
import { createThemedStyle } from '../themed'
import { useThemedStyleList } from '../themed/hooks'
import { COUNTRIES_LIST, Country } from './'
import CountryRow from './CountryRow'

type CountriesDropdownSelectProps = {
  model: {
    countryModel: StateModel<Country | null>
    searchableListModel: SearchableListModel<Country>
  }
}

const CountriesDropdownSelect = React.memo(
  ({ model }: CountriesDropdownSelectProps) => {
    const t = useText()
    const { styles } = useThemedStyleList({
      countryItem: countryRowThemedStyles,
    })

    const selectPreset = useDropdownSelectPreset()

    const renderCountryRow: RenderItem<Country> = (item, isSelected) => (
      <CountryRow
        item={item}
        style={{
          name: [
            styles.countryItem.name,
            isSelected && styles.countryItem.name__selected,
          ],
        }}
      />
    )

    return (
      <DropdownSelect
        label={t.country}
        data={COUNTRIES_LIST}
        idExtractor={({ alpha2Code }) => alpha2Code}
        model={model.countryModel}
        searchModel={model.searchableListModel}
        renderItem={renderCountryRow}
        labelExtractor={({ name }) => name}
        style={{
          dropdownTab: dropdownTabStyles,
        }}
        preset={selectPreset}
      />
    )
  }
)

const dropdownTabStyles = StyleSheet.create({
  wrapper: {
    marginBottom: 20,
  },
})

const countryRowThemedStyles = createThemedStyle((colors) =>
  StyleSheet.create({
    name: {
      color: colors.text,
      fontFamily: FONT_MEDIUM,
      fontSize: 16,
      lineHeight: 21,
    },
    name__selected: {
      color: colors.textAccent,
    },
  })
)

export default CountriesDropdownSelect
