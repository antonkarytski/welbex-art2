import React from 'react'
import Svg, { Path } from 'react-native-svg'
import { IconProps } from './_types'

export default function IncomingArrowIcon({
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
        d="M3 17V21C3 21.2652 3.23705 21.5196 3.65901 21.7071C4.08097 21.8946 4.65326 22 5.25 22H18.75C19.3467 22 19.919 21.8946 20.341 21.7071C20.7629 21.5196 21 21.2652 21 21V17"
        stroke={color}
        stroke-width="1.6"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M16 12L12 16L8 12"
        stroke={color}
        stroke-width="1.6"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M12 3V16"
        stroke={color}
        stroke-width="1.6"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  )
}
