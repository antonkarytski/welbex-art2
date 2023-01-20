import { useStore } from 'effector-react'
import React, { useEffect } from 'react'
import NotesSettingsList from '../../features/notifications/NotesSettingsList'
import { useText } from '../../translations/hook'
import SettingScreenContainer from './stylePresets/SettingScreenContainer'

export default function NotificationsScreen() {
  const t = useText()

  return (
    <SettingScreenContainer title={t.notifications}>
      <NotesSettingsList />
    </SettingScreenContainer>
  )
}
