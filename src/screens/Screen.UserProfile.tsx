import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Animated, StyleSheet, View } from 'react-native'
import ProfileDrawingsListTabs from '../features/profile/ProfileDrawingsListTabs'
import ProfileTopBlock, {
  PROFILE_TOP_BLOCK_INITIAL_HEIGHT,
} from '../features/profile/ProfileTopBlock'
import { useProfileDrawingsListTabs } from '../features/profile/hooks'
import { createThemedStyle } from '../features/themed'
import { useThemedStyle } from '../features/themed/hooks'
import UserCountersBlock from '../features/user/UserCountersBlock'
import UserScreenHeader from '../features/user/UserScreenHeader'
import UserTopBlock from '../features/user/UserTopBlock'
import UserDrawingsListTabView from '../features/user/drawingsList/UserDrawingsListTabView'
import UserDrawingsListTabs from '../features/user/drawingsList/UserDrawingsListTabs'
import { useTabsListsSync } from '../features/user/drawingsList/hook.listSync'
import { useStickyTabsStyle } from '../features/user/drawingsList/hook.stickyTabs'
import { useChildrenDrawingsListTabs } from '../features/user/drawingsList/hooks.drawingTabs'
import { getUserExt } from '../features/user/request'
import { UserDrawingListType, UserExt } from '../features/user/types'
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
  const [userExt, setUserExt] = useState<UserExt | null>(null)

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
        label={item.name}
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

  // return (
  //   <UserDrawingsListTabs tabsProps={userGalleryTabsProps}>
  //     <UserScreenHeader backAvailable item={item} label={item.name} />
  //     {userExt ? (
  //       <UserCountersBlock item={userExt} style={styles.countersBlock} />
  //     ) : null}
  //   </UserDrawingsListTabs>
  // )
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
