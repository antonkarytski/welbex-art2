import React from 'react'
import { StyleSheet } from 'react-native'
import { StateModel } from 'altek-toolkit'
import { useDropdownSelectPreset } from '../../styles/selects'
import { useText } from '../../translations/hook'
import DropdownMultiSelect from '../../ui/multiSelects/DropdownMultiSelect'
import { DropdownSelectStyles } from '../../ui/selects/types'
import { AgeCategory, ageCategories } from './ages'

type AgeMultiSelectProps = {
  model: StateModel<AgeCategory[]>
  style?: DropdownSelectStyles
}

const AgeMultiSelect = ({ model, style }: AgeMultiSelectProps) => {
  const t = useText()
  const stylesPreset = useDropdownSelectPreset()

  return (
    <DropdownMultiSelect
      label={t.age}
      model={model}
      data={ageCategories}
      labelExtractor={({ label }) => label}
      idExtractor={({ id }) => id.toString()}
      style={{ dropdownTab: dropdownTabStyles, ...style }}
      preset={stylesPreset}
      tabLabel={({ items }) => {
        if (!items.length) return ''
        return `${t.selected}: ${items?.length}`
      }}
      showSelectAllButtons
      selectAllLabel={t.selectAll}
      removeAllLabel={t.removeAll}
      showSelectedIcon
    />
  )
}

const dropdownTabStyles = StyleSheet.create({
  wrapper: {
    marginBottom: 20,
  },
})

export default AgeMultiSelect
