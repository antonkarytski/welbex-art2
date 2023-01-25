import React from 'react'
import FaqList from '../../features/faq/FaqList'
import { useText } from '../../translations/hook'
import SettingScreenContainer from './stylePresets/SettingScreenContainer'

export default function FaqScreen() {
  const t = useText()
  return (
    <SettingScreenContainer title={t.faq}>
      <FaqList />
    </SettingScreenContainer>
  )
}
