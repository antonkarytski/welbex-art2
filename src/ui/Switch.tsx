import React from 'react'
import {
  Switch as BaseSwitch,
  StyleProp,
  StyleSheet,
  TextStyle,
  ViewStyle,
} from 'react-native'
import {
  FormFieldComponentProps,
  useFormField,
} from '../lib/componentsModels/model.testForm'
import Row from '../ui/Row'
import Span, { SpanProps } from '../ui/Span'

type SwitchProp<T extends Record<string, boolean>> = {
  label?: string
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
} & FormFieldComponentProps<boolean, T>

const Switch = <T extends Record<string, boolean>>({
  label,
  formModel,
  name,
  disabled,
  colors,
  style,
  labelWeight = 500,
}: SwitchProp<T>) => {
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
