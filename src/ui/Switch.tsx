import React from 'react'
import {
  Switch as BaseSwitch,
  StyleProp,
  StyleSheet,
  TextStyle,
  ViewStyle,
} from 'react-native'
import { useSpecificTypeFormField } from '../lib/models/form/hooks'
import { TypedFormFieldComponentProps } from '../lib/models/form/model.form'
import Row from '../ui/Row'
import Span from '../ui/Span'

export type SwitcherColors = {
  thumb?: string
  trackActive?: string
  track?: string
}

export type SwitcherStyles = {
  wrapper?: StyleProp<ViewStyle>
  label?: StyleProp<TextStyle>
}

type SwitchProp<T extends Record<string, boolean>, K extends keyof T> = {
  label?: string
  disabled?: boolean
  colors?: SwitcherColors
  style?: SwitcherStyles
} & TypedFormFieldComponentProps<T, K, boolean>

const Switch = <T extends Record<string, boolean>, K extends keyof T>({
  label,
  formModel,
  name,
  disabled,
  colors,
  style,
}: SwitchProp<T, K>) => {
  const [isEnabled, setIsEnabled] = useSpecificTypeFormField<T, boolean>(
    formModel,
    name
  )

  return (
    <Row style={[styles.wrapper, style?.wrapper]}>
      {label && (
        <Span label={label} style={[styles.label, style?.label]} weight={500} />
      )}
      <BaseSwitch
        trackColor={{
          false: colors?.track || '#D5DDDC',
          true: colors?.trackActive || '#347B81',
        }}
        thumbColor={colors?.thumb || '#ffffff'}
        onValueChange={setIsEnabled}
        value={isEnabled}
        disabled={disabled}
      />
    </Row>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
  },
  label: {
    marginRight: 'auto',
    fontSize: 16,
    lineHeight: 21,
  },
})

export default Switch
