import React, { ReactNode } from 'react'
import { StyleSheet, View, ViewProps } from 'react-native'
import { createThemedStyle } from '../../features/themed'
import { useTheme } from '../../features/themed/hooks'
import { ColorThemeStructure } from '../../features/themed/theme'
import {
  STATUSBAR_HEIGHT,
  WINDOW_WIDTH,
} from '../../lib/device/dimensions/constants'
import { IS_IOS } from '../../lib/helpers/native/constants'
import Span from '../../ui/Span'
import NavigationBackButton from './NavigationButton.Back'
import { ScreenHeaderStyles } from './styles'

export type ScreenHeaderProps =
  | {
      headerRight?: ReactNode
      headerLeft?: ReactNode
      style?:
        | ScreenHeaderStyles
        | ((colors: ColorThemeStructure) => ScreenHeaderStyles)
      onBack?: () => void
      backAvailable?: boolean
      backArrowColor?: string
      onLayout?: ViewProps['onLayout']
    } & (
      | {
          title?: never
          children: ReactNode
        }
      | {
          title: string
          children?: ReactNode
        }
    )

const ScreenHeader = ({
  title,
  headerRight,
  headerLeft,
  style: styleOrFn,
  onBack,
  backAvailable,
  children,
  backArrowColor,
  onLayout,
}: ScreenHeaderProps) => {
  const { colors, styles } = useTheme(themedStyles)
  const style = typeof styleOrFn === 'function' ? styleOrFn(colors) : styleOrFn

  return (
    <View onLayout={onLayout}>
      <View style={[styles.container, style?.container]}>
        <View style={styles.sideBlock}>
          {headerLeft ||
            (backAvailable && (
              <NavigationBackButton
                style={styles.backButton}
                iconColor={backArrowColor ?? colors.primary2}
                onPress={onBack}
              />
            ))}
        </View>
        <View style={styles.titleContainer}>
          {children ? (
            children
          ) : (
            <Span
              label={title}
              weight={600}
              style={[styles.title, style?.title]}
            />
          )}
        </View>
        <View style={styles.sideBlock}>{headerRight}</View>
      </View>
      <View style={[styles.line, style?.line]} />
    </View>
  )
}

const SIDE_BLOCK_WIDTH = 60

const themedStyles = createThemedStyle((colors) =>
  StyleSheet.create({
    container: {
      paddingTop: IS_IOS ? 56 : STATUSBAR_HEIGHT,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    sideBlock: {
      width: SIDE_BLOCK_WIDTH,
    },
    titleContainer: {
      paddingVertical: 18,
      maxWidth: WINDOW_WIDTH - SIDE_BLOCK_WIDTH * 2,
    },
    title: {
      color: colors.navigationLabelSelected,
      fontSize: 18,
      width: '100%',
    },
    line: {
      marginHorizontal: 20,
      height: 1,
      backgroundColor: colors.primary3,
    },
    backButton: {
      paddingHorizontal: 24,
      paddingVertical: 18,
    },
  })
)

export default ScreenHeader
