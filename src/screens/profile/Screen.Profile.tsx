import { useStore } from 'effector-react'
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react'
import {
  Animated,
  ScrollView,
  StyleSheet,
  View,
  ViewProps,
  useWindowDimensions,
} from 'react-native'
import { SceneMap, TabView } from 'react-native-tab-view'
import OfferToGetAuthorization from '../../features/auth/OfferToGetAuthorization'
import { $isAuth } from '../../features/auth/model'
import { useProfileDrawingsListTabs } from '../../features/profile/hooks'
import { $userProfile } from '../../features/profile/model'
import { createThemedStyle } from '../../features/themed'
import { useThemedStyleList } from '../../features/themed/hooks'
import UserAvatar from '../../features/user/UserAvatar'
import UserCountersBlock from '../../features/user/UserCountersBlock'
import UserScreenHeader from '../../features/user/UserScreenHeader'
import UserDrawingsList from '../../features/user/drawingsList/UserDrawingsList'
import TabMenuButtons, {
  TabMenuButtonsProps,
} from '../../features/user/tabMenu/TabMenuButtons'
import UserDrawingsTabMenu from '../../features/user/tabMenu/UserDrawingsTabMenu'
import { UserDrawingListType } from '../../features/user/types'
import { SCREEN_HEIGHT } from '../../lib/device/dimensions'
import GradientScreenHeader from '../../navigation/elements/GradientScreenHeader'
import SettingsNavigationButton from '../../navigation/elements/NavigationButton.Settings'
import ScreenHeader from '../../navigation/elements/ScreenHeader'
import { coloredScreenHeaderThemedStyles } from '../../styles/screen'
import { useText } from '../../translations/hook'
import Gradient from '../../ui/gradients/Gradient'
import MotionGradient from '../../ui/gradients/MotionGradient'

type StickyTabsController = {
  setState: (state: boolean) => void
}

type StickyTabsProps = {
  routes: TabMenuButtonsProps['routes']
  top: number
}

const FirstRoute = () => {
  const profile = useStore($userProfile)
  return (
    <UserDrawingsList
      // onScroll={Animated.event(
      //   [{ nativeEvent: { contentOffset: { y: offset } } }],
      //   { useNativeDriver: true }
      // )}
      style={{
        flex: 1,
        height: '100%',
        width: '100%',
      }}
      ListHeader={<></>}
      type={UserDrawingListType.OWN}
      item={profile}
    />
  )
}

const SecondRoute = () => (
  <View style={{ flex: 1, backgroundColor: '#673ab7' }} />
)

const renderScene = SceneMap({
  first: FirstRoute,
  second: SecondRoute,
})

const StickyTabs = forwardRef<StickyTabsController, StickyTabsProps>(
  ({ routes, top }, ref) => {
    const [isSticky, setIsSticky] = useState(false)

    useImperativeHandle(ref, () => {
      return {
        setState: setIsSticky,
      }
    })

    if (!isSticky) return null

    return (
      <View
        style={{
          position: 'absolute',
          width: '100%',
          top,
          zIndex: 2,
          backgroundColor: 'white',
          paddingHorizontal: 20,
        }}
      >
        <TabMenuButtons routes={routes} onButtonPress={() => {}} />
      </View>
    )
  }
)

type ProfileHeaderProps = {
  onLayout?: ViewProps['onLayout']
}

const ProfileHeader = ({ onLayout }: ProfileHeaderProps) => {
  const { styles, colors } = useThemedStyleList({
    header: coloredScreenHeaderThemedStyles,
    common: themedStyles,
  })
  const profile = useStore($userProfile)
  return (
    <View onLayout={onLayout}>
      <UserAvatar style={styles.common.avatar} item={profile} />
      <UserCountersBlock item={profile} style={styles.common.countersBlock} />
    </View>
  )
}

const ProfileScreen = () => {
  const text = useText()
  const profile = useStore($userProfile)
  const { styles, colors } = useThemedStyleList({
    header: coloredScreenHeaderThemedStyles,
    common: themedStyles,
  })
  // TODO - delete and check if profile null
  const isAuth = useStore($isAuth)
  const profileGalleryTabsProps = useProfileDrawingsListTabs()
  const offset = useRef(new Animated.Value(0)).current
  const stickyRef = useRef<StickyTabsController | null>(null)
  const offset2 = useRef(new Animated.Value(0)).current

  const [headerHeight, setHeaderHeight] = useState(0)
  const [contentHeight, setContentHeight] = useState(0)

  useEffect(() => {
    const id = offset.addListener(({ value }) => {
      stickyRef.current?.setState(value > contentHeight - 1)
    })
    return () => offset.removeListener(id)
  }, [offset, contentHeight])

  const layout = useWindowDimensions()

  const [index, setIndex] = React.useState(0)
  const [routes] = React.useState([
    { key: 'first', title: 'First' },
    { key: 'second', title: 'Second' },
  ])

  if (!isAuth) {
    return (
      <View style={styles.common.container}>
        <GradientScreenHeader title={text.profile} />
        <ScrollView style={styles.common.unauthorizedContainer}>
          <OfferToGetAuthorization enableDescriptionText />
        </ScrollView>
      </View>
    )
  }

  return (
    <View style={styles.common.container}>
      <MotionGradient
        offsetValue={offset}
        minHeight={headerHeight}
        maxHeight={headerHeight + 80}
      />
      <ScreenHeader
        onLayout={({ nativeEvent }) => {
          if (!headerHeight) setHeaderHeight(nativeEvent.layout.height)
        }}
        title={text.profile}
        headerRight={
          <SettingsNavigationButton iconColor={colors.appHeaderIconLight} />
        }
      />
      <StickyTabs
        ref={stickyRef}
        top={headerHeight}
        routes={profileGalleryTabsProps.routes}
      />
      <ProfileHeader
        onLayout={({ nativeEvent }) => {
          if (!contentHeight) setContentHeight(nativeEvent.layout.height)
        }}
      />
      <TabMenuButtons
        style={{
          backgroundColor: 'white',
          marginBottom: 24,
        }}
        routes={profileGalleryTabsProps.routes}
        onButtonPress={() => {}}
      />

      <TabView
        renderTabBar={() => {
          return (
            <View
              style={{
                width: '100%',
                height: 500,
                backgroundColor: 'red',
              }}
            />
          )
        }}
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
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
      marginBottom: 32,
    },
    tabs: {
      backgroundColor: colors.screenBackground,
    },
    unauthorizedContainer: {
      paddingHorizontal: 20,
      padding: SCREEN_HEIGHT / 4.8,
    },
    screen: {
      backgroundColor: colors.screenBackground,
    },
    screenHeaderLine: {
      backgroundColor: 'transparent',
    },
    avatar: {
      marginTop: 24,
      alignSelf: 'center',
    },
  })
)

export default ProfileScreen
