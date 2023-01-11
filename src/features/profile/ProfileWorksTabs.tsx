import React, { useEffect, useRef } from 'react'
import {
  Animated,
  StyleProp,
  TouchableOpacity,
  View,
  ViewStyle,
  useWindowDimensions,
} from 'react-native'
import { SceneMap, TabView } from 'react-native-tab-view'
import { SceneRendererProps } from 'react-native-tab-view/lib/typescript/src/types'
import { animationInterpolate } from 'altek-toolkit'
import { MOCK_RANDOM_DRAWINGS } from '../../_mock/drawings'
import Span from '../../ui/Span'
import DrawingsList from '../drawing/DrawingsList'
import { useColors } from '../themed'
import ProfileTabMenu from './tabMenu/ProfileTabMenu'
import TabMenuButton from './tabMenu/TabMenuButton'

type ProfileWorksTabsProps = {
  style?: StyleProp<ViewStyle>
}

const FirstRoute = () => {
  return <DrawingsList data={MOCK_RANDOM_DRAWINGS} />
}

const SecondRoute = () => {
  return <DrawingsList data={MOCK_RANDOM_DRAWINGS} />
}

const renderScene = SceneMap({
  first: FirstRoute,
  second: SecondRoute,
})

const renderTabBar = (props: SceneRendererProps) => {
  return <ProfileTabMenu {...props} routes={routes} />
}

const routes = [
  { key: 'first', title: 'First' },
  { key: 'second', title: 'Second' },
]

const ProfileWorksTabs = ({ style }: ProfileWorksTabsProps) => {
  const layout = useWindowDimensions()

  const [index, setIndex] = React.useState(0)

  return (
    <TabView
      style={style}
      renderTabBar={renderTabBar}
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
    />
  )
}

export default ProfileWorksTabs
