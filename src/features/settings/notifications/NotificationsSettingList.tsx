import React from 'react'
import { FlatList, StyleSheet } from 'react-native'
import { getSwitcherThemedColors } from '../../../styles/switch'
import { useText } from '../../../translations/hook'
import ListItemSeparator from '../../../ui/ListItemSeparator'
import { useThemeColors } from '../../themed/hooks'
import NotificationsSettingItem from './NotificationsSettingItem'
import {
  NOTIFICATIONS_DESCRIPTORS,
  NotificationSwitchDescriptor,
} from './model.notificationsSetting'

const NotificationsSettingList = React.memo(() => {
  const t = useText()
  const colors = useThemeColors()
  const switcherColors = getSwitcherThemedColors(colors)

  const renderItem = ({ item }: { item: NotificationSwitchDescriptor }) => {
    return (
      <NotificationsSettingItem
        label={item.label(t)}
        name={item.name}
        switcherColors={switcherColors}
        style={switcherStyles}
      />
    )
  }

  return (
    <FlatList
      data={NOTIFICATIONS_DESCRIPTORS}
      renderItem={renderItem}
      ItemSeparatorComponent={ListItemSeparator}
      ListFooterComponent={ListItemSeparator}
    />
  )
})

const switcherStyles = StyleSheet.create({
  wrapper: { paddingVertical: 20 },
})

export default NotificationsSettingList
