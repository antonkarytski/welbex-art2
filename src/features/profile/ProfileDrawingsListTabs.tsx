import React from 'react'
import { Animated, StyleProp, ViewStyle } from 'react-native'
import UserDrawingsListTabView, {
  CommonTabsProps,
  Route,
} from '../user/drawingsList2/UserDrawingsListTabView'
import { UseDrawingsTabsSettings } from '../user/drawingsList2/hooks.drawingTabs'
import { UserDrawingListType } from '../user/types'
import { useProfileDrawingsListTabs } from './hooks'

type ProfileDrawingsListTabsProps = {
  listSettings?: UseDrawingsTabsSettings
} & CommonTabsProps<Route<UserDrawingListType>>

const ProfileDrawingsListTabs = ({
  style,
  tabsStyle,
  listSettings,
}: ProfileDrawingsListTabsProps) => {
  const tabsProps = useProfileDrawingsListTabs(listSettings)

  return (
    <UserDrawingsListTabView
      {...tabsProps}
      style={style}
      tabsStyle={tabsStyle}
    />
  )
}

export default ProfileDrawingsListTabs
