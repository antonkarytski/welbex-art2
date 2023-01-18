import React from 'react'
import { useText } from '../../translations/hook'
import SettingScreenContainer from './stylePresets/SettingScreenContainer'

export default function DeleteAccountScreen() {
  const t = useText()
  return (
    <SettingScreenContainer title={t.deleteAccount}>
      {/*  */}
    </SettingScreenContainer>
  )
}
