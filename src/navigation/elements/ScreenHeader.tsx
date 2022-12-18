import React, { ReactNode } from 'react'
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native'
import { createThemedStyle } from '../../features/themed'
import { useTheme } from '../../features/themed/hooks'
import Span from '../../ui/Span'
import NavigationBackButton from './Button.NavigationBack'
import { ScreenHeaderStyles } from './styles'

type ScreenHeaderProps = {
  title: string | ReactNode
  headerRight?: ReactNode
  style?: ScreenHeaderStyles
  onBack?: () => void
}

const ScreenHeader = ({
  title,
  headerRight,
  style,
  onBack,
}: ScreenHeaderProps) => {
  const { colors, styles } = useTheme(themedStyles)

  return (
    <View>
      <View style={[styles.container, style?.container]}>
        <View style={styles.leftBlock}></View>
        <View style={styles.titleContainer}>
          <Span weight={600} style={styles.title}>
            {title}
          </Span>
        </View>
        <View style={styles.rightBlock}></View>
      </View>
      <View style={[styles.line, style?.line]}></View>
    </View>
  )
}

const themedStyles = createThemedStyle((colors) =>
  StyleSheet.create({
    container: {
      paddingTop: 56,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    leftBlock: {},
    rightBlock: {},
    titleContainer: {
      paddingVertical: 18,
    },
    title: {
      color: colors.navigationLabelSelected,
      fontSize: 18,
    },
    line: {
      marginHorizontal: 20,
      height: 1,
      backgroundColor: colors.primary3,
    },
  })
)

export default ScreenHeader
