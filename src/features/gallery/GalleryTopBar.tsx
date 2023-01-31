import { MaterialTopTabBarProps } from '@react-navigation/material-top-tabs'
import React from 'react'
import {
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native'
import { NamedStyles } from '../../features/themed/createThemedStyles'
import { ColorThemeStructure, defaultColors } from '../../features/themed/theme'
import { FONT_MEDIUM } from '../../styles/fonts'
import Row from '../../ui/Row'
import Span from '../../ui/Span'

type CustomGalleryTopBarProps = {
  style?: NamedStyles<{
    label?: TextStyle
    labelActive?: TextStyle
    tabBar?: ViewStyle
  }>
  colors: ColorThemeStructure
} & MaterialTopTabBarProps

const GalleryTopBar = ({
  state,
  descriptors,
  navigation,
  style,
  colors,
}: CustomGalleryTopBarProps) => {
  return (
    <View style={[styles.tabBar, style?.tabBar]}>
      <Row style={styles.row}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key]
          const { title } = options
          const isFocused = state.index === index

          const onNavigate = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            })

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate({ name: route.name, merge: true })
            }
          }

          return (
            <TouchableOpacity
              key={route.key}
              onPress={onNavigate}
              activeOpacity={0.7}
              style={[
                styles.tabItem,
                style?.label,
                isFocused && [styles.tabItemActive, style?.labelActive],
              ]}
            >
              <Span
                label={title}
                style={[styles.label, isFocused && styles.labelActive]}
              />
            </TouchableOpacity>
          )
        })}
      </Row>
    </View>
  )
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: 'transparent',
    paddingHorizontal: 20,
  },
  row: {
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: defaultColors.tabsLine,
  },
  tabItem: {
    paddingTop: 32,
    paddingBottom: 12,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderColor: 'transparent',
    marginBottom: -1,
  },
  tabItemActive: {
    borderColor: defaultColors.tabsSelectedTint,
  },
  label: {
    fontFamily: FONT_MEDIUM,
    fontSize: 18,
    color: defaultColors.textLightGrey,
  },
  labelActive: {
    color: defaultColors.text,
  },
})

export default GalleryTopBar
