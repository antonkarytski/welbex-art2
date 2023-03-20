import { useStore } from 'effector-react'
import React, {
  ForwardedRef,
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react'
import {
  Animated,
  StyleProp,
  View,
  ViewStyle,
  useWindowDimensions,
} from 'react-native'
import { TabView } from 'react-native-tab-view'
import { SceneRendererProps } from 'react-native-tab-view/lib/typescript/src/types'
import { UserDrawingListType } from '../types'
import {
  Route,
  TabMenuNavigationProps,
  UserArtsListHeightModel,
  UserArtsTabMenuNavigationModel,
} from './types'

export type CommonTabsProps<T extends Route> = {
  style?: StyleProp<ViewStyle>
  onRouteChange?: (route: T) => void
}

type UserDrawingsListTabViewProps<T extends Route> = {
  scenes: (
    props: SceneRendererProps & {
      route: T
    }
  ) => React.ReactNode
  routes: (T & {
    Icon: (isActive: boolean) => React.ReactElement
  })[]
  tabMenuHeight: number
  tabMenuNavigationModel: UserArtsTabMenuNavigationModel
  listsHeightModel: UserArtsListHeightModel
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
        onRouteChange,
        tabMenuHeight,
        tabMenuNavigationModel,
        listsHeightModel,
      }: UserDrawingsListTabViewProps<T>,
      ref: ForwardedRef<DrawingListTabsViewController<T>>
    ) => {
      const layout = useWindowDimensions()
      const [index, setIndex] = useState(0)
      const drawingsListsHeight = useStore(listsHeightModel.$listsHeight)
      const currentKey = useStore(listsHeightModel.$activeListTabKey)
      const tabBarNavigationProps = useRef<TabMenuNavigationProps | null>(null)

      useEffect(() => {
        if (!tabBarNavigationProps.current) return
        tabMenuNavigationModel.set(tabBarNavigationProps.current)
      }, [tabBarNavigationProps.current, tabMenuNavigationModel])

      const renderTabBar = useCallback((props: TabMenuNavigationProps) => {
        tabBarNavigationProps.current = props
        return <View />
      }, [])

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
        listsHeightModel.setActiveListTabKey(
          routes[index].key as UserDrawingListType
        )
      }, [onRouteChange, index, routes, listsHeightModel])

      return (
        <Animated.View
          style={{
            height: drawingsListsHeight[currentKey] + tabMenuHeight + 68,
          }}
        >
          <TabView
            style={style}
            renderTabBar={renderTabBar}
            navigationState={{ index, routes }}
            renderScene={scenes}
            onIndexChange={setIndex}
            initialLayout={{ width: layout.width }}
          />
        </Animated.View>
      )
    }
  )
)

export default UserDrawingsListTabView
