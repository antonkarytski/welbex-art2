import { useNavigation } from '@react-navigation/native'
import React, { ReactNode } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { createThemedStyle } from '../../features/themed'
import { useTheme } from '../../features/themed/hooks'
import { ColorThemeStructure } from '../../features/themed/theme'
import Span from '../../ui/Span'
import ArrowIcon from '../../ui/icons/Icon.Arrow'
import { ScreenHeaderStyles } from './styles'

export type ScreenHeaderProps =
  | {
      headerRight?: ReactNode
      style?:
        | ScreenHeaderStyles
        | ((colors: ColorThemeStructure) => ScreenHeaderStyles)
      onBack?: () => void
      backAvailable?: boolean
      backArrowColor?: string
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
  style: styleOrFn,
  onBack,
  backAvailable,
  children,
  backArrowColor,
}: ScreenHeaderProps) => {
  const navigation = useNavigation()
  const { colors, styles } = useTheme(themedStyles)
  const style = typeof styleOrFn === 'function' ? styleOrFn(colors) : styleOrFn

  return (
    <View>
      <View style={[styles.container, style?.container]}>
        <View style={styles.sideBlock}>
          {backAvailable ? (
            <TouchableOpacity
              onPress={navigation.goBack}
              style={styles.backButton}
            >
              <ArrowIcon color={backArrowColor ?? colors.primary2} />
            </TouchableOpacity>
          ) : null}
        </View>
        <View style={styles.titleContainer}>
          {children ? (
            children
          ) : (
            <Span weight={600} style={[styles.title, style?.title]}>
              {title}
            </Span>
          )}
        </View>
        <View style={styles.sideBlock} />
      </View>
      <View style={[styles.line, style?.line]} />
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
    sideBlock: {
      width: 100,
    },
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
    backButton: {
      paddingHorizontal: 24,
      paddingVertical: 18,
    },
  })
)

export default ScreenHeader
