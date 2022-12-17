import React from 'react'
import Svg, { Path } from 'react-native-svg'
import { IconProps } from './_types'

export default function OkIcon({
  size = 24,
  color = '#303535',
  style,
}: IconProps) {
  return (
    <Svg
      width={size}
      height={size}
      style={style}
      fill="none"
      viewBox="0 0 24 24"
    >
      <Path
        d="M20 6L9 17L4 12"
        stroke={color}
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  )
}
