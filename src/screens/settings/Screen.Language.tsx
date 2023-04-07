import React from 'react'
import LanguagesSelect from '../../features/settings/LanguagesSelect'
import { useText } from '../../translations/hook'
import SettingScreenContainer from './stylePresets/SettingScreenContainer'

export default function LanguageScreen() {
  const t = useText()

  return (
    <SettingScreenContainer title={t.language}>
      <LanguagesSelect />
    </SettingScreenContainer>
  )
}
