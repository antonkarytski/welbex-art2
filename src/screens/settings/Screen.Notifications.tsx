import React from 'react'
import { createStateModel } from 'altek-toolkit'
import { useThemeColors } from '../../features/themed/hooks'
import { switchThemedColors } from '../../styles/switch'
import { useText } from '../../translations/hook'
import Switch from '../../ui/Switch'
import SettingScreenContainer from './stylePresets/SettingScreenContainer'

const switchModel = createStateModel(false)

export default function NotificationsScreen() {
  const t = useText()
  const colors = useThemeColors()
  const switchColors = switchThemedColors(colors)

  return (
    <SettingScreenContainer title={t.notifications}>
      <Switch
        label={'Contest info'}
        colors={switchColors}
        model={switchModel}
      />
    </SettingScreenContainer>
  )
}
