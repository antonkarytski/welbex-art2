import React, { useCallback } from 'react'
import { FlatList, StyleSheet } from 'react-native'
import { useThemeColors } from '../../../features/themed/hooks'
import { getSwitcherThemedColors } from '../../../styles/switch'
import { useText } from '../../../translations/hook'
import ListItemSeparator from '../../../ui/ListItemSeparator'
import NoteSettingItem from './NotificationsSettingItem'
import {
  NOTIFICATIONS_DESCRIPTORS,
  NotificationSwitchDescriptor,
} from './model.notificationsSetting'

const NotificationsSettingList = () => {
  const t = useText()
  const colors = useThemeColors()
  const switcherColors = getSwitcherThemedColors(colors)

  const renderItem = useCallback(
    ({ item }: { item: NotificationSwitchDescriptor }) => (
      <NoteSettingItem
        label={item.label(t)}
        name={item.name}
        switcherColors={switcherColors}
        style={switcherStyles}
      />
    ),
    [switcherColors, t]
  )

  return (
    <FlatList
      data={NOTIFICATIONS_DESCRIPTORS}
      renderItem={renderItem}
      ItemSeparatorComponent={ListItemSeparator}
      ListFooterComponent={ListItemSeparator}
    />
  )
}

const switcherStyles = StyleSheet.create({
  wrapper: { paddingVertical: 20 },
})

export default NotificationsSettingList
