import { useStore } from 'effector-react'
import moment from 'moment'
import React from 'react'
import { StyleSheet } from 'react-native'
import { useDropdownSelectPreset } from '../../../styles/selects'
import { useText } from '../../../translations/hook'
import DropdownSelect from '../../../ui/selects/DropdownSelect'
import {
  monthOfParticipationItems,
  selectedMonthOfParticipationModel,
} from './model'

type PostMonthSelectProps = {}
const PostMonthSelect = ({}: PostMonthSelectProps) => {
  const t = useText()
  const items = useStore(monthOfParticipationItems.$state)
  const stylesPreset = useDropdownSelectPreset()

  return (
    <DropdownSelect
      label={t.monthOfParticipation}
      model={selectedMonthOfParticipationModel}
      data={items}
      labelExtractor={(value) => moment(value).format('MMMM YYYY')}
      idExtractor={(value) => value.toString()}
      style={{ dropdownTab: dropdownTabStyles }}
      preset={stylesPreset}
      placeholder={t.selectValueFromList}
    />
  )
}

const dropdownTabStyles = StyleSheet.create({
  wrapper: {
    marginBottom: 20,
  },
})

export default PostMonthSelect
