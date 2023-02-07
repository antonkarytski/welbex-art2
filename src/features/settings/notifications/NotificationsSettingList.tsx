import React from 'react'
import { FlatList, StyleSheet } from 'react-native'
import { FONT_MEDIUM } from '../../../styles/fonts'
import { getSwitcherThemedColors } from '../../../styles/switch'
import { useText } from '../../../translations/hook'
import ListItemSeparator from '../../../ui/lists/ListItemSeparator'
import { createThemedStyle } from '../../themed'
import { useTheme } from '../../themed/hooks'
import NotificationsSettingItem from './NotificationsSettingItem'
import {
  NOTIFICATIONS_DESCRIPTORS,
  NotificationSwitchDescriptor,
} from './model.notificationsSetting'

const NotificationsSettingList = React.memo(() => {
  const t = useText()
  const { colors, styles: switcherStyles } = useTheme(themedSwitcherStyles)
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

const themedSwitcherStyles = createThemedStyle((colors) =>
  StyleSheet.create({
    wrapper: { paddingVertical: 20 },
    label: {
      color: colors.text,
      font: FONT_MEDIUM,
      fontSize: 16,
      lineHeight: 21,
    },
  })
)

export default NotificationsSettingList
