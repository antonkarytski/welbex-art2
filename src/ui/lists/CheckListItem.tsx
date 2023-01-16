import React from 'react'
import { StyleProp, StyleSheet, TextStyle, View, ViewStyle } from 'react-native'
import { IconProps } from 'altek-ui'
import Span from '../Span'
import IconCheckCircle from '../icons/Icon.CheckCircle'

type ListItemProps = {
  textStyle?: StyleProp<TextStyle>
  style?: StyleProp<ViewStyle>
  label: string
  color?: string
}

const CheckListItem = React.memo(
  ({ label, textStyle, style, color }: ListItemProps) => {
    return (
      <View style={[styles.container, style]}>
        <IconCheckCircle color={color} />
        <Span style={[styles.text, textStyle]} weight={500} label={label} />
      </View>
    )
  }
)

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: 8,
    alignItems: 'center',
  },
  text: {
    marginLeft: 11,
  },
})

export default CheckListItem
