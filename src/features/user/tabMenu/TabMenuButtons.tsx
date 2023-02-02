import React from 'react'
import { StyleProp, StyleSheet, TextStyle, View } from 'react-native'
import TabMenuButton from './TabMenuButton'

type TabMenuButtonsProps = {
  routes: { key: string; title: string }[]
  onButtonPress: (key: string) => void
  buttonLabelStyle?: StyleProp<TextStyle>
  buttonActiveLabelStyle?: StyleProp<TextStyle>
  activeTabKey?: string
}

const TabMenuButtons = ({
  routes,
  onButtonPress,
  buttonLabelStyle,
  buttonActiveLabelStyle,
  activeTabKey,
}: TabMenuButtonsProps) => {
  return (
    <View style={styles.container}>
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
