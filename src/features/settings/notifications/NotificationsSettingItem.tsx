import React from 'react'
import Switch, { SwitcherColors, SwitcherStyles } from '../../../ui/Switch'
import {
  NotificationType,
  notificationsSettingModel,
} from './model.notificationsSetting'

type NotificationsSettingItemProps = {
  label: string
  name: NotificationType
  switcherColors: SwitcherColors
  style: SwitcherStyles
}

const NotificationsSettingItem = React.memo(
  ({ name, label, switcherColors, style }: NotificationsSettingItemProps) => {
    return (
      <Switch
        label={label}
        formModel={notificationsSettingModel}
        name={name}
        colors={switcherColors}
        style={style}
      />
    )
  }
)

export default NotificationsSettingItem
