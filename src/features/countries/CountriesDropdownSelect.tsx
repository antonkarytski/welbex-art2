import React from 'react'
import { StyleSheet } from 'react-native'
import { StateModel } from 'altek-toolkit'
import { SearchableListModel } from '../../lib/models/model.search'
import { FONT_MEDIUM } from '../../styles/fonts'
import { useText } from '../../translations/hook'
import DropdownSelect from '../../ui/selects/DropdownSelect'
import { RenderItem } from '../../ui/selects/types'
import { createThemedStyle } from '../themed'
import { useThemedStyleList } from '../themed/hooks'
import { COUNTRIES_LIST, Country } from './'
import CountryRow from './CountryRow'

type CountriesDropdownSelectProps = {
  model: StateModel<Country>
  searchModel?: SearchableListModel<Country>
}

const CountriesDropdownSelect = React.memo(
  ({ model, searchModel }: CountriesDropdownSelectProps) => {
    const t = useText()
    const { styles } = useThemedStyleList({
      dropdownTab: dropdownTabThemedStyles,
      selectItem: selectItemThemedStyles,
    })

    const renderCountryRow: RenderItem<Country> = (item, isSelected) => (
      <CountryRow
        item={item}
        style={{
          ...styles.selectItem,
          name: [
            styles.selectItem.name,
            isSelected && styles.selectItem.name__selected,
          ],
        }}
      />
    )

    return (
      <DropdownSelect
        label={t.country}
        data={COUNTRIES_LIST}
        idExtractor={({ alpha2Code }) => alpha2Code}
        model={model}
        searchModel={searchModel}
        renderItem={renderCountryRow}
        labelExtractor={({ name }) => name}
        style={{
          dropdownTab: styles.dropdownTab,
        }}
      />
    )
  }
)

const dropdownTabThemedStyles = createThemedStyle((colors) =>
  StyleSheet.create({
    label: {
      color: colors.textGrey,
      fontSize: 14,
      lineHeight: 20,
      fontFamily: FONT_MEDIUM,
    },
    wrapper: {
      marginBottom: 20,
    },
  })
)

const selectItemThemedStyles = createThemedStyle((colors) =>
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
