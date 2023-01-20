import React from 'react'
import {
  Switch as BaseSwitch,
  StyleProp,
  StyleSheet,
  TextStyle,
  ViewStyle,
} from 'react-native'
import { StateModel, useStateStore } from 'altek-toolkit'
import Row from '../ui/Row'
import Span, { SpanProps } from '../ui/Span'

interface SwitchProp {
  label?: string
  model: StateModel<boolean>
  disabled?: boolean
  colors?: {
    thumb?: string
    trackActive?: string
    track?: string
  }
  style?: {
    wrapper?: StyleProp<ViewStyle>
    label?: StyleProp<TextStyle>
  }
  labelWeight?: SpanProps['weight']
}

const Switch = ({
  label,
  model,
  disabled,
  colors,
  style,
  labelWeight = 500,
}: SwitchProp) => {
  const [isEnabled, setIsEnabled] = useStateStore(model)

  return (
    <Row style={[styles.wrapper, style?.wrapper]}>
      {label && (
        <Span
          label={label}
          style={[styles.label, style?.label]}
          weight={labelWeight}
        />
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
