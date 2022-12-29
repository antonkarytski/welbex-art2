import React from 'react'
import Svg, { Path } from 'react-native-svg'
import { IconProps } from './_types'

export default function ArrowIcon({
  size = 8,
  color = '#303535',
  style,
}: IconProps) {
  return (
    <Svg
      width={size}
      height={size / 1.6}
      style={style}
      fill="none"
      viewBox="0 0 10 6"
    >
      <Path
        d="M1 1L5 5L9 1"
        stroke={color}
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}
