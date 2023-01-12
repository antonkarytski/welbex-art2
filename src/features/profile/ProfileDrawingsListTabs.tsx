import React from 'react'
import { StyleProp, ViewStyle } from 'react-native'
import UserDrawingsListTabView from '../user/drawingsList/UserDrawingsListTabView'
import { useProfileDrawingsListTabs } from './hooks'

type ProfileDrawingsListTabsProps = {
  style?: StyleProp<ViewStyle>
}

const ProfileDrawingsListTabs = ({ style }: ProfileDrawingsListTabsProps) => {
  const tabsProps = useProfileDrawingsListTabs()

  return <UserDrawingsListTabView {...tabsProps} style={style} />
}

export default ProfileDrawingsListTabs
