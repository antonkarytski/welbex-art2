import { useFocusEffect } from '@react-navigation/native'
import { useStore } from 'effector-react'
import React, { useCallback } from 'react'
import { FlatList } from 'react-native'
import { noop } from '../../../lib/helpers'
import { useText } from '../../../translations/hook'
import ListItemSeparator from '../../../ui/lists/ListItemSeparator'
import { $isAuth } from '../../auth/model'
import { loadFaq } from '../../faq/model'
import { createThemedStyle } from '../../themed'
import { useTheme } from '../../themed/hooks'
import SettingsListItem from './SettingsListItem'
import { SETTINGS_LIST, SettingItem } from './settingsListData'

const loadFaqSync = () => {
  loadFaq().catch(noop)
}

const SettingsList = React.memo(() => {
  const t = useText()
  const { styles, colors } = useTheme(themedStyles)

  const isAuth = useStore($isAuth)

  useFocusEffect(loadFaqSync)

  const renderItem = useCallback(
    ({ item }: { item: SettingItem }) => (
      <SettingsListItem
        item={item}
        label={item.label(t)}
        textColor={colors.text}
        style={styles}
      />
    ),
    [colors.text, styles, t]
  )

  return (
    <FlatList
      data={
        isAuth
          ? SETTINGS_LIST
          : SETTINGS_LIST.filter(
              ({ isAbleWhenUnauthorized }) => isAbleWhenUnauthorized
            )
      }
      renderItem={renderItem}
      ItemSeparatorComponent={ListItemSeparator}
    />
  )
})

const themedStyles = createThemedStyle((colors) => ({
  item: {
    paddingVertical: 20,
  },
  row: {
    justifyContent: 'flex-start',
  },
  settingIcon: {
    marginRight: 18,
  },
  toggleIcon: {
    marginLeft: 'auto',
    transform: [{ rotate: '-90deg' }],
  },
  label: {
    fontSize: 16,
    lineHeight: 19,
    color: colors.text,
  },
}))

export default SettingsList
