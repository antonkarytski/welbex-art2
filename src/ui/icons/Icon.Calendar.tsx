import React from 'react'
import Svg, { Path } from 'react-native-svg'
import { IconProps } from './_types'

export default function CalendarIcon({
  size = 20,
  color = '#303535',
  style,
}: IconProps) {
  return (
    <Svg
      width={size}
      height={size * 1.05}
      style={style}
      fill="none"
      viewBox="0 0 20 21"
    >
      <Path
        d="M15.8333 3.83337H4.16667C3.24619 3.83337 2.5 4.57957 2.5 5.50004V17.1667C2.5 18.0872 3.24619 18.8334 4.16667 18.8334H15.8333C16.7538 18.8334 17.5 18.0872 17.5 17.1667V5.50004C17.5 4.57957 16.7538 3.83337 15.8333 3.83337Z"
        stroke={color}
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M2.5 8.83337H17.5"
        stroke={color}
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M13.3335 2.16663V5.49996"
        stroke={color}
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M6.6665 2.16663V5.49996"
        stroke={color}
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}
