import React, { PropsWithChildren } from 'react'
import {
  LayoutChangeEvent,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
} from 'react-native'

export type SpanProps = {
  label?: string | number
  style?: StyleProp<TextStyle>
  weight?: 400 | 500 | 600 | 700
  onLayout?: (event: LayoutChangeEvent) => void
}

const Span = ({
  children,
  label,
  style,
  weight = 400,
  onLayout,
}: PropsWithChildren<SpanProps>) => {
  return (
    <Text
      allowFontScaling={false}
      style={[styles.common, weights[weight], style]}
      onLayout={onLayout}
    >
      {label ?? children}
    </Text>
  )
}

const weights = StyleSheet.create({
  '400': {
    fontFamily: 'Inter-400',
  },
  '500': {
    fontFamily: 'Inter-500',
  },
  '600': {
    fontFamily: 'Inter-600',
  },
  '700': {
    fontFamily: 'Inter-700',
  },
})

const styles = StyleSheet.create({
  common: {
    fontFamily: 'Inter-400',
    fontSize: 14,
  },
})

export default Span
