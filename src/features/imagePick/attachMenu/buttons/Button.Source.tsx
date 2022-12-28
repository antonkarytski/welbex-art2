import React, { ReactElement } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { COLORS, IconProps, Text } from 'altek-ui'
import { useColors } from '../../../themed'

type ButtonSourceProps = {
  title: string
  Icon: (props: IconProps) => ReactElement
  onPress: () => void
}
export const ButtonSource = ({ title, Icon, onPress }: ButtonSourceProps) => {
  const colors = useColors()
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={[styles.iconWrapper, { backgroundColor: colors.text }]}>
        <Icon />
      </View>
      <Text
        medium
        style={[styles.label, { color: colors.text }]}
        label={title}
      />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: { marginTop: 'auto', alignItems: 'center', marginRight: 20 },
  iconWrapper: {
    width: 40,
    height: 40,
    borderRadius: 50,
    backgroundColor: COLORS.BLUE.COMMON,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: 12,
    lineHeight: 16,
  },
})
