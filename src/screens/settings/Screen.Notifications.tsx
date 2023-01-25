import React from 'react'
import NotificationsSettingList from '../../features/settings/notifications/NotificationsSettingList'
import { useText } from '../../translations/hook'
import SettingScreenContainer from './stylePresets/SettingScreenContainer'

export default function NotificationsScreen() {
  const t = useText()

  return (
    <SettingScreenContainer title={t.notifications}>
      <NotificationsSettingList />
    </SettingScreenContainer>
  )
}
