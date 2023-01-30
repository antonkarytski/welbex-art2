import React from 'react'
import Svg, { Path } from 'react-native-svg'
import { IconProps } from './_types'

export default function UserIcon({
  size = 34,
  color = '#D5DDDC',
  style,
}: IconProps) {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 34 34"
      fill="none"
      style={style}
    >
      <Path
        d="M31 32V29.3333C31 27.9188 30.2625 26.5623 28.9497 25.5621C27.637 24.5619 25.8565 24 24 24H10C8.14348 24 6.36301 24.5619 5.05025 25.5621C3.7375 26.5623 3 27.9188 3 29.3333V32"
        stroke={color}
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M17.5 17C21.6421 17 25 13.6421 25 9.5C25 5.35786 21.6421 2 17.5 2C13.3579 2 10 5.35786 10 9.5C10 13.6421 13.3579 17 17.5 17Z"
        stroke={color}
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}
