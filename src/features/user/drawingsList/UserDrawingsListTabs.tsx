import React from 'react'
import { StyleProp, ViewStyle } from 'react-native'
import { UserExt } from '../types'
import UserDrawingsListTabView from './UserDrawingsListTabView'
import { TabsDescriptor, useDrawingsTabs } from './hooks.drawingTabs'

type UserDrawingsListTabsProps = {
  item: UserExt
  style?: StyleProp<ViewStyle>
  tabs: TabsDescriptor
}

const UserDrawingsListTabs = ({
  style,
  item,
  tabs,
}: UserDrawingsListTabsProps) => {
  const props = useDrawingsTabs(tabs, item)
  return <UserDrawingsListTabView {...props} style={style} />
}

export default UserDrawingsListTabs
