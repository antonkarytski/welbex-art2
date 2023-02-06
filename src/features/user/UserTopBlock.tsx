import React, { useEffect, useState } from 'react'
import { Animated, StyleSheet } from 'react-native'
import ScreenHeader from '../../navigation/elements/ScreenHeader'
import { CompleteTo } from '../../types'
import AdaptiveGradient from '../../ui/gradients/AdaptiveGradient'
import MotionGradient from '../../ui/gradients/MotionGradient'
import { createThemedStyle } from '../themed'
import { useTheme } from '../themed/hooks'
import { ColorThemeStructure } from '../themed/theme'
import UserAvatar from './UserAvatar'
import UserCountersBlock from './UserCountersBlock'
import { User, UserExt } from './types'

export type UserTopBlockProps = {
  backAvailable?: boolean
  label: string
  offsetValue: Animated.Value | Animated.AnimatedInterpolation<number>
  initialHeight: number
  item: UserExt | CompleteTo<User, UserExt>
  onHeightChange?: (height: number) => void
  headerRight?: (colors: ColorThemeStructure) => React.ReactNode
}

const HEADER_INITIAL_HEIGHT = 100

const UserTopBlock = React.memo(
  ({
    item,
    offsetValue,
    onHeightChange,
    initialHeight,
    label,
    headerRight,
    backAvailable,
  }: UserTopBlockProps) => {
    const [headerHeight, setHeaderHeight] = useState(HEADER_INITIAL_HEIGHT)
    const [height, setHeight] = useState(initialHeight)
    const { styles, colors } = useTheme(themedStyles)
    const y = offsetValue.interpolate({
      inputRange: [0, height],
      outputRange: [0, -height],
      extrapolateRight: 'clamp',
    })

    useEffect(() => {
      if (height !== initialHeight) {
        onHeightChange?.(height)
      }
    }, [height, onHeightChange, initialHeight])

    return (
      <>
        <MotionGradient
          offsetValue={offsetValue}
          minHeight={headerHeight}
          maxHeight={headerHeight + 80}
        />
        <Animated.View
          style={[
            styles.container,
            { top: headerHeight, transform: [{ translateY: y }] },
          ]}
          onLayout={({ nativeEvent }) => {
            if (height === initialHeight) {
              setHeight(nativeEvent.layout.height)
            }
          }}
        >
          <UserAvatar style={styles.avatar} item={item} />
          {item.followers_count !== undefined && (
            <UserCountersBlock item={item} style={styles.countersBlock} />
          )}
        </Animated.View>
        <AdaptiveGradient>
          <ScreenHeader
            backAvailable={backAvailable}
            title={label}
            onLayout={({ nativeEvent }) => {
              if (headerHeight === HEADER_INITIAL_HEIGHT) {
                setHeaderHeight(nativeEvent.layout.height)
              }
            }}
            headerRight={headerRight?.(colors)}
          />
        </AdaptiveGradient>
      </>
    )
  }
)

const themedStyles = createThemedStyle((colors) =>
  StyleSheet.create({
    container: {
      position: 'absolute',
      zIndex: 0,
    },
    countersBlock: {
      marginTop: 32,
      marginBottom: 32,
    },
    avatar: {
      marginTop: 24,
      alignSelf: 'center',
    },
  })
)

export default UserTopBlock
