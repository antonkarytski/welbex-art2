import { useStore } from 'effector-react'
import moment from 'moment'
import React from 'react'
import { useDropdownSelectPreset } from '../../../styles/selects'
import { useText } from '../../../translations/hook'
import DropdownSelect from '../../../ui/selects/DropdownSelect'
import { DropdownSelectStyles } from '../../../ui/selects/types'
import { monthOfParticipationItems, monthOfParticipationModel } from './model'

type PostMonthSelectProps = {
  style?: DropdownSelectStyles
}
const PostMonthSelect = ({ style }: PostMonthSelectProps) => {
  const t = useText()
  const items = useStore(monthOfParticipationItems.$state)
  const stylesPreset = useDropdownSelectPreset()

  return (
    <DropdownSelect
      label={t.monthOfParticipation}
      model={monthOfParticipationModel}
      data={items}
      labelExtractor={(value) => moment(value).format('MMMM YYYY')}
      idExtractor={(value) => value.toString()}
      style={style}
      preset={stylesPreset}
      placeholder={t.selectValueFromList}
    />
  )
}

export default PostMonthSelect
