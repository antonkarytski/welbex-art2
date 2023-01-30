import React, { PropsWithChildren } from 'react'
import {
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from 'react-native'
import Span from '../Span'
import CheckBox from './CheckBox'
import CircleCheckBox from './CircleCheckBox'

type CheckBoxCardProps = {
  isSelected: boolean
  onPress: (nextState: boolean) => void
  checkboxColor?: ((state: boolean) => string) | string
  style?: ((state: boolean) => StyleProp<ViewStyle>) | StyleProp<ViewStyle>
  label?: string
  checkboxForm?: 'circle' | 'square'
}

const CheckBoxCard = ({
  style,
  isSelected,
  onPress,
  checkboxColor,
  label,
  children,
  checkboxForm = 'circle',
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
      {checkboxForm === 'circle' && (
        <CircleCheckBox
          color={checkboxColor}
          style={styles.checkbox}
          isSelected={isSelected}
          onSelect={onPress}
        />
      )}
      {checkboxForm === 'square' && (
        <CheckBox
          isSelected={isSelected}
          style={{ container: [styles.checkbox] }}
          onSelect={onPress}
        />
      )}
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
