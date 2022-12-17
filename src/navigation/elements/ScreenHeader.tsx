import React, { ReactNode } from 'react'
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native'
import { Text } from 'altek-ui'
import { createThemedStyle } from '../../features/themed'
import { useTheme } from '../../features/themed/hooks'
import NavigationBackButton from './Button.NavigationBack'

type ScreenHeaderProps = {
  title: string
  headerRight?: ReactNode
  style?: StyleProp<ViewStyle>
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
    <View style={[styles.container, style]}>
      <NavigationBackButton
        color={colors.text}
        style={styles.backButton}
        onPress={onBack}
      />
      <View style={styles.content}>
        <Text bold style={styles.title} label={title} />
        {headerRight ? (
          <View style={styles.rightContainer}>{headerRight}</View>
        ) : null}
      </View>
    </View>
  )
}

const themedStyles = createThemedStyle((colors) =>
  StyleSheet.create({
    container: {
      marginTop: 12,
      flexDirection: 'row',
      alignItems: 'center',
      paddingLeft: 8,
    },
    rightContainer: {
      marginLeft: 'auto',
    },
    content: {
      marginBottom: 19,
      flexDirection: 'row',
      alignItems: 'flex-end',
      flex: 1,
    },
    backButton: {
      paddingBottom: 19,
      paddingRight: 15,
    },
    title: {
      color: colors.text,
      fontSize: 20,
    },
  })
)

export default ScreenHeader
