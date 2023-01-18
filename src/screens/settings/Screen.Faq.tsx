import React from 'react'
import { useText } from '../../translations/hook'
import SettingScreenContainer from './stylePresets/SettingScreenContainer'

export default function FAQScreen() {
  const t = useText()
  return <SettingScreenContainer title={t.faq}>{/*  */}</SettingScreenContainer>
}
