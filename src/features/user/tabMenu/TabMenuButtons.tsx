import React from 'react'
import { StyleProp, StyleSheet, TextStyle, View, ViewStyle } from 'react-native'
import TabMenuButton from './TabMenuButton'

export type TabMenuButtonsProps = {
  routes: { key: string; title: string }[]
  onButtonPress: (key: string) => void
  buttonLabelStyle?: StyleProp<TextStyle>
  buttonActiveLabelStyle?: StyleProp<TextStyle>
  activeTabKey?: string
  style?: StyleProp<ViewStyle>
}

const TabMenuButtons = ({
  routes,
  onButtonPress,
  buttonLabelStyle,
  buttonActiveLabelStyle,
  activeTabKey,
  style,
}: TabMenuButtonsProps) => {
  return (
    <View style={[styles.container, style]}>
      {routes.map(({ key, title }) => {
        return (
          <TabMenuButton
            textStyle={buttonLabelStyle}
            textActiveStyle={buttonActiveLabelStyle}
            isActive={activeTabKey === key}
            onPress={onButtonPress}
            key={key}
            label={title}
            id={key}
          />
        )
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
})

export default TabMenuButtons
