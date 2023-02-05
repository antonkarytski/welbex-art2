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
  FlatList,
  ScrollView,
  StyleProp,
  StyleSheet,
  View,
  ViewProps,
  ViewStyle,
  useWindowDimensions,
} from 'react-native'
import { SceneMap, TabView } from 'react-native-tab-view'
import OfferToGetAuthorization from '../../features/auth/OfferToGetAuthorization'
import { $isAuth } from '../../features/auth/model'
import ProfileDrawingsListTabs from '../../features/profile/ProfileDrawingsListTabs'
import { useProfileDrawingsListTabs } from '../../features/profile/hooks'
import { $userProfile } from '../../features/profile/model'
import { createThemedStyle } from '../../features/themed'
import { useThemedStyleList } from '../../features/themed/hooks'
import UserAvatar from '../../features/user/UserAvatar'
import UserCountersBlock from '../../features/user/UserCountersBlock'
import TabMenuButtons, {
  TabMenuButtonsProps,
} from '../../features/user/tabMenu/TabMenuButtons'
import { UserDrawingListType } from '../../features/user/types'
import { SCREEN_HEIGHT } from '../../lib/device/dimensions'
import GradientScreenHeader from '../../navigation/elements/GradientScreenHeader'
import SettingsNavigationButton from '../../navigation/elements/NavigationButton.Settings'
import ScreenHeader from '../../navigation/elements/ScreenHeader'
import { coloredScreenHeaderThemedStyles } from '../../styles/screen'
import { useText } from '../../translations/hook'
import AdaptiveGradient from '../../ui/gradients/AdaptiveGradient'
import MotionGradient from '../../ui/gradients/MotionGradient'

import AnimatedProps = Animated.AnimatedProps

type StickyTabsController = {
  setState: (state: boolean) => void
}

type StickyTabsProps = {
  routes: TabMenuButtonsProps['routes']
  top: number
}

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
  style?: AnimatedProps<ViewStyle>
}

const ProfileHeader = ({ onLayout, style }: ProfileHeaderProps) => {
  const { styles, colors } = useThemedStyleList({
    header: coloredScreenHeaderThemedStyles,
    common: themedStyles,
  })
  const profile = useStore($userProfile)
  return (
    <Animated.View
      style={[{ position: 'absolute', zIndex: 0 }, style]}
      onLayout={onLayout}
    >
      <UserAvatar style={styles.common.avatar} item={profile} />
      <UserCountersBlock item={profile} style={styles.common.countersBlock} />
    </Animated.View>
  )
}

const ProfileScreen = () => {
  const text = useText()
  const { styles, colors } = useThemedStyleList({
    header: coloredScreenHeaderThemedStyles,
    common: themedStyles,
  })
  // TODO - delete and check if profile null
  const isAuth = useStore($isAuth)
  const offset = useRef(new Animated.Value(0)).current
  const stickyRef = useRef<StickyTabsController | null>(null)

  const [headerHeight, setHeaderHeight] = useState(0)
  const [contentHeight, setContentHeight] = useState(0)

  useEffect(() => {
    const id = offset.addListener(({ value }) => {
      stickyRef.current?.setState(value > contentHeight - 1)
    })
    return () => offset.removeListener(id)
  }, [offset, contentHeight])
  const currentTab = useRef<UserDrawingListType | null>(null)
  const listRefs = useRef<
    Partial<Record<UserDrawingListType, FlatList | null>>
  >({})
  const listOffset = useRef<Partial<Record<UserDrawingListType, number>>>({})
  useEffect(() => {
    offset.addListener(({ value }) => {
      if (!currentTab.current) return
      const tab = currentTab.current
      listOffset.current[tab] = value
    })

    return () => {
      offset.removeAllListeners()
    }
  }, [offset])

  const syncScrollOffset = () => {
    const current = currentTab.current
    Object.entries(listRefs.current).forEach(([key, item]) => {
      //@ts-ignore
      const value = offset._value
      const tab = key as UserDrawingListType
      if (tab === current || !item) return
      if (value < contentHeight && value >= 0) {
        item.scrollToOffset({
          offset: value,
          animated: false,
        })
        listOffset.current[tab] = value
        return
      }
      if (value >= contentHeight) {
        const tabOffset = listOffset.current[tab]
        if (tabOffset === undefined || tabOffset < contentHeight) {
          item.scrollToOffset({
            offset: contentHeight,
            animated: false,
          })
          listOffset.current[tab] = contentHeight
        }
      }
    })
  }

  const y = offset.interpolate({
    inputRange: [0, contentHeight],
    outputRange: [0, -contentHeight],
    extrapolateRight: 'clamp',
  })

  const tabY = offset.interpolate({
    inputRange: [0, contentHeight],
    outputRange: [contentHeight, 0],
    extrapolateRight: 'clamp',
  })

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
      <ProfileHeader
        style={{ top: headerHeight, transform: [{ translateY: y }] }}
        onLayout={({ nativeEvent }) => {
          if (!contentHeight) setContentHeight(nativeEvent.layout.height)
        }}
      />
      <AdaptiveGradient>
        <ScreenHeader
          onLayout={({ nativeEvent }) => {
            if (!headerHeight) setHeaderHeight(nativeEvent.layout.height)
          }}
          title={text.profile}
          headerRight={
            <SettingsNavigationButton iconColor={colors.appHeaderIconLight} />
          }
        />
      </AdaptiveGradient>
      <ProfileDrawingsListTabs
        listSettings={{
          onScroll: Animated.event(
            [{ nativeEvent: { contentOffset: { y: offset } } }],
            { useNativeDriver: true }
          ),
          contentStyle: { paddingTop: contentHeight + 24 },
          listRef: (key, ref) => {
            listRefs.current[key] = ref
          },
          onScrollEnd: syncScrollOffset,
        }}
        tabsStyle={{ transform: [{ translateY: tabY }] }}
        onRouteChange={({ key }) => {
          currentTab.current = key
        }}
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
