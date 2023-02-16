import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Animated, StyleSheet, View } from 'react-native'
import { Profile } from '../api/parts/users/types'
import { createThemedStyle } from '../features/themed'
import { useThemedStyle } from '../features/themed/hooks'
import UserTopBlock from '../features/user/UserTopBlock'
import UserDrawingsListTabView from '../features/user/drawingsList/UserDrawingsListTabView'
import { useTabsListsSync } from '../features/user/drawingsList/hook.listSync'
import { useStickyTabsStyle } from '../features/user/drawingsList/hook.stickyTabs'
import { useChildrenDrawingsListTabs } from '../features/user/drawingsList/hooks.drawingTabs'
import { userName } from '../features/user/helpers'
import { getUserExt } from '../features/user/request'
import { UserDrawingListType } from '../features/user/types'
import { links } from '../navigation/links'
import { ScreenComponentProps } from '../navigation/types.screenProps'

export const USER_PROFILE_TOP_BLOCK_INITIAL_HEIGHT = 345
const UserProfileScreen = ({
  route,
}: ScreenComponentProps<links.userProfile>) => {
  const item = route.params.item
  const [topBlockHeight, setTopBlockHeight] = useState(
    USER_PROFILE_TOP_BLOCK_INITIAL_HEIGHT
  )
  const offset = useRef(new Animated.Value(0)).current
  const [userExt, setUserExt] = useState<Profile | null>(null)

  const styles = useThemedStyle(themedStyles)

  useEffect(() => {
    getUserExt(item).then((result) => {
      if (result) setUserExt(result)
    })
  }, [item])

  const currentTabRef = useRef<UserDrawingListType | null>(null)
  const listSettings = useTabsListsSync({
    scrollOffsetValue: offset,
    topOffset: topBlockHeight,
    currentTabRef,
  })
  const tabsProps = useChildrenDrawingsListTabs(item, listSettings)
  const onRouteChange = useCallback(({ key }: { key: string }) => {
    currentTabRef.current = key as UserDrawingListType
  }, [])
  const tabsStyle = useStickyTabsStyle(offset, topBlockHeight)

  return (
    <View style={styles.container}>
      <UserTopBlock
        backAvailable
        label={userName(item)}
        item={userExt ?? item}
        offsetValue={offset}
        initialHeight={USER_PROFILE_TOP_BLOCK_INITIAL_HEIGHT}
        onHeightChange={setTopBlockHeight}
      />
      <UserDrawingsListTabView
        {...tabsProps}
        tabsStyle={tabsStyle}
        onRouteChange={onRouteChange}
      />
    </View>
  )
}

const themedStyles = createThemedStyle((colors) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    countersBlock: {
      marginTop: 32,
    },
    tabs: {
      backgroundColor: colors.screenBackground,
    },
  })
)

export default UserProfileScreen
