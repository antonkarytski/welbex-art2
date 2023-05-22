import React from 'react'
import { StyleProp, TextStyle } from 'react-native'
import Span from '../Span'

type ClockProps = {
  value: number
  valueFormatter?: (value: number) => string
  style?: StyleProp<TextStyle>
}

export default function Clock({ value, valueFormatter, style }: ClockProps) {
  const timerValue =
    valueFormatter?.(value) || Math.round(value / 1000).toString()

  return <Span label={timerValue} style={style} />
}
