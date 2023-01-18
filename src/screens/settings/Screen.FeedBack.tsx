import React from 'react'
import { useText } from '../../translations/hook'
import SettingScreenContainer from './stylePresets/SettingScreenContainer'

export default function FeedbackScreen() {
  const t = useText()
  return (
    <SettingScreenContainer title={t.feedback}>{/*  */}</SettingScreenContainer>
  )
}
