import React, { useCallback, useEffect, useMemo, useRef } from 'react'
import { Animated, FlatList, StyleProp, ViewStyle } from 'react-native'
import UserDrawingsListTabView, {
  CommonTabsProps,
  Route,
} from '../user/drawingsList2/UserDrawingsListTabView'
import { TabListSettings } from '../user/drawingsList2/hooks.drawingTabs'
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
  const currentTab = useRef<UserDrawingListType | null>(null)
  const listOffsets = useRef<Partial<Record<UserDrawingListType, number>>>({})
  const listRefs = useRef<
    Partial<Record<UserDrawingListType, FlatList | null>>
  >({})

  const onRouteChange = useCallback(({ key }: { key: string }) => {
    currentTab.current = key as UserDrawingListType
  }, [])

  const tabY = scrollOffsetValue.interpolate({
    inputRange: [0, topOffset],
    outputRange: [topOffset, 0],
    extrapolateRight: 'clamp',
  })

  const tabsStyle = useMemo(() => {
    return { transform: [{ translateY: tabY }] }
  }, [tabY])

  const syncScrollOffset = useCallback(() => {
    const current = currentTab.current
    Object.entries(listRefs.current).forEach(([key, item]) => {
      //@ts-ignore
      const value = scrollOffsetValue._value
      const tab = key as UserDrawingListType
      if (tab === current || !item) return
      if (value < topOffset && value >= 0) {
        item.scrollToOffset({
          offset: value,
          animated: false,
        })
        listOffsets.current[tab] = value
        return
      }
      if (value >= topOffset) {
        const tabOffset = listOffsets.current[tab]
        if (tabOffset === undefined || tabOffset < topOffset) {
          item.scrollToOffset({
            offset: topOffset,
            animated: false,
          })
          listOffsets.current[tab] = topOffset
        }
      }
    })
  }, [topOffset, scrollOffsetValue])

  const listSettings = useMemo<TabListSettings>(
    () => ({
      onScroll: Animated.event(
        [{ nativeEvent: { contentOffset: { y: scrollOffsetValue } } }],
        { useNativeDriver: true }
      ),
      contentStyle: { paddingTop: topOffset + 24 },
      listRef: (key, ref) => {
        listRefs.current[key] = ref
      },
      onScrollEnd: syncScrollOffset,
    }),
    [topOffset, scrollOffsetValue, syncScrollOffset]
  )

  useEffect(() => {
    scrollOffsetValue.addListener(({ value }) => {
      if (!currentTab.current) return
      const tab = currentTab.current
      listOffsets.current[tab] = value
    })

    return () => {
      scrollOffsetValue.removeAllListeners()
    }
  }, [scrollOffsetValue])

  const tabsProps = useProfileDrawingsListTabs(listSettings)

  return (
    <UserDrawingsListTabView
      {...tabsProps}
      tabsStyle={tabsStyle}
      onRouteChange={onRouteChange}
    />
  )
}

export default ProfileDrawingsListTabs
