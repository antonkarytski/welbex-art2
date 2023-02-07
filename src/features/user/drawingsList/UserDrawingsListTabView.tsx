import React, {
  ForwardedRef,
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react'
import {
  Animated,
  StyleProp,
  ViewStyle,
  useWindowDimensions,
} from 'react-native'
import { TabView } from 'react-native-tab-view'
import { SceneRendererProps } from 'react-native-tab-view/lib/typescript/src/types'
import UserDrawingsTabMenu from '../tabMenu/UserDrawingsTabMenu'

export type Route<K extends string = string> = {
  key: K
  icon?: string
  title?: string
  accessible?: boolean
  accessibilityLabel?: string
  testID?: string
}

export type CommonTabsProps<T extends Route> = {
  style?: StyleProp<ViewStyle>
  tabsStyle?: Animated.AnimatedProps<ViewStyle>
  onRouteChange?: (route: T) => void
}

type UserDrawingsListTabViewProps<T extends Route> = {
  scenes: (
    props: SceneRendererProps & {
      route: T
    }
  ) => React.ReactNode
  routes: (T & { title: string })[]
} & CommonTabsProps<T>

type DrawingListTabsViewController<T extends Route> = {
  currentRoute: T
}

const UserDrawingsListTabView = React.memo(
  forwardRef(
    <T extends Route>(
      {
        style,
        scenes,
        routes,
        tabsStyle,
        onRouteChange,
      }: UserDrawingsListTabViewProps<T>,
      ref: ForwardedRef<DrawingListTabsViewController<T>>
    ) => {
      const layout = useWindowDimensions()
      const [index, setIndex] = useState(0)

      const renderTabBar = useCallback(
        (props: SceneRendererProps) => {
          return (
            <UserDrawingsTabMenu {...props} routes={routes} style={tabsStyle} />
          )
        },
        [routes, tabsStyle]
      )

      useImperativeHandle(
        ref,
        () => {
          return {
            currentRoute: routes[index],
          }
        },
        [index, routes]
      )

      useEffect(() => {
        onRouteChange?.(routes[index])
      }, [onRouteChange, index, routes])

      return (
        <TabView
          style={style}
          renderTabBar={renderTabBar}
          navigationState={{ index, routes }}
          renderScene={scenes}
          onIndexChange={setIndex}
          initialLayout={{ width: layout.width }}
        />
      )
    }
  )
)

export default UserDrawingsListTabView
