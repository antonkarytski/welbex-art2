import React from 'react'
import FeedbackForm from '../../features/feedback/FeedbackForm'
import { useText } from '../../translations/hook'
import SettingScreenContainer from './stylePresets/SettingScreenContainer'

export default function FeedbackScreen() {
  const t = useText()
  return (
    <SettingScreenContainer title={t.feedback} enableScrollView>
      <FeedbackForm />
    </SettingScreenContainer>
  )
}
