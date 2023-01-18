import React, { useCallback, useMemo } from 'react'
import { FlatList } from 'react-native'
import { useText } from '../../translations/hook'
import ListItemSeparator from '../../ui/ListItemSeparator'
import SettingsListItem from './SettingsListItem'
import { SettingItem, getSettingsList } from './settingsListData'

const SettingsList = () => {
  const t = useText()
  const settingsList = useMemo(() => getSettingsList(t), [t])

  const renderItem = useCallback(
    ({ item }: { item: SettingItem }) => <SettingsListItem item={item} />,
    []
  )

  return (
    <FlatList
      data={settingsList}
      renderItem={renderItem}
      ItemSeparatorComponent={ListItemSeparator}
    />
  )
}

export default SettingsList
