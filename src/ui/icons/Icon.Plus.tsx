import React from 'react'
import Svg, { Path } from 'react-native-svg'
import { IconProps } from './_types'

export default function PlusIcon({
  size = 22,
  color = '#303535',
  style,
}: IconProps) {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 23 23"
      fill="none"
      style={style}
    >
      <Path
        d="M5 12H19"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M12 19V5"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}
