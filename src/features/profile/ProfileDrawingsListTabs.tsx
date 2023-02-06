import React, { useCallback, useRef } from 'react'
import { Animated } from 'react-native'
import UserDrawingsListTabView from '../user/drawingsList2/UserDrawingsListTabView'
import { useTabsListsSync } from '../user/drawingsList2/hook.listSync'
import { useStickyTabsStyle } from '../user/drawingsList2/hook.stickyTabs'
import { UserDrawingListType } from '../user/types'
import { useProfileDrawingsListTabs } from './hooks'

type ProfileDrawingsListTabsProps = {
  scrollOffsetValue: Animated.Value
  topOffset: number
}

const ProfileDrawingsListTabs = ({
  scrollOffsetValue,
  topOffset,
}: ProfileDrawingsListTabsProps) => {
  const currentTabRef = useRef<UserDrawingListType | null>(null)
  const listSettings = useTabsListsSync({
    scrollOffsetValue,
    topOffset,
    currentTabRef,
  })
  const tabsProps = useProfileDrawingsListTabs(listSettings)
  const onRouteChange = useCallback(({ key }: { key: string }) => {
    currentTabRef.current = key as UserDrawingListType
  }, [])
  const tabsStyle = useStickyTabsStyle(scrollOffsetValue, topOffset)

  return (
    <UserDrawingsListTabView
      {...tabsProps}
      tabsStyle={tabsStyle}
      onRouteChange={onRouteChange}
    />
  )
}

export default ProfileDrawingsListTabs
