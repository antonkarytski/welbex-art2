import React from 'react'
import {
  Switch as BaseSwitch,
  StyleProp,
  StyleSheet,
  TextStyle,
  ViewStyle,
} from 'react-native'
import {
  TypedFormFieldComponentProps,
  useFormField,
} from '../lib/componentsModels/model.form'
import Row from '../ui/Row'
import Span, { SpanProps } from '../ui/Span'

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
  labelWeight?: SpanProps['weight']
} & TypedFormFieldComponentProps<T, K, boolean>

const Switch = <T extends Record<string, boolean>, K extends keyof T>({
  label,
  formModel,
  name,
  disabled,
  colors,
  style,
  labelWeight = 500,
}: SwitchProp<T, K>) => {
  const [isEnabled, setIsEnabled] = useFormField(formModel, name)

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
