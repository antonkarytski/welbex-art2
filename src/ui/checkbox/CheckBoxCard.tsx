import React, { PropsWithChildren } from 'react'
import {
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native'
import Span from '../Span'
import CircleCheckBox from './CircleCheckBox'

type CheckBoxCardProps = {
  isSelected: boolean
  onPress: (nextState: boolean) => void
  checkboxColor?: ((state: boolean) => string) | string
  style?: ((state: boolean) => StyleProp<ViewStyle>) | StyleProp<ViewStyle>
  label?: string
}

const CheckBoxCard = ({
  style,
  isSelected,
  onPress,
  checkboxColor,
  label,
  children,
}: PropsWithChildren<CheckBoxCardProps>) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={[
        styles.container,
        typeof style === 'function' ? style(isSelected) : style,
      ]}
      onPress={() => onPress(!isSelected)}
    >
      {children ? children : <Span style={styles.label}>{label}</Span>}
      <CircleCheckBox
        color={checkboxColor}
        style={styles.checkbox}
        isSelected={isSelected}
      />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 12,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  checkbox: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  label: {
    paddingHorizontal: 20,
  },
})

export default CheckBoxCard
