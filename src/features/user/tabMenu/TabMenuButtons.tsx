import React from 'react'
import { StyleProp, StyleSheet, TextStyle, View } from 'react-native'
import TabMenuButton from './TabMenuButton'

type TabMenuButtonsProps = {
  routes: { key: string; title: string }[]
  onButtonPress: (key: string) => void
  buttonLabelStyle?: StyleProp<TextStyle>
}

const TabMenuButtons = ({
  routes,
  onButtonPress,
  buttonLabelStyle,
}: TabMenuButtonsProps) => {
  return (
    <View style={styles.container}>
      {routes.map(({ key, title }) => {
        return (
          <TabMenuButton
            textStyle={buttonLabelStyle}
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
