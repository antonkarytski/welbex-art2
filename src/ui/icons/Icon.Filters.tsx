import React from 'react'
import Svg, { Path } from 'react-native-svg'
import { IconProps } from './_types'

export default function FiltersIcon({
  size = 24,
  color = '#B4DCD8',
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
        d="M4.5 12H2M4.5 12C4.5 13.3807 5.61929 14.5 7 14.5C8.38071 14.5 9.5 13.3807 9.5 12M4.5 12C4.5 10.6193 5.61929 9.5 7 9.5C8.38071 9.5 9.5 10.6193 9.5 12M19.5 19.5C19.5 18.1193 18.3807 17 17 17C15.6193 17 14.5 18.1193 14.5 19.5M19.5 19.5C19.5 20.8807 18.3807 22 17 22C15.6193 22 14.5 20.8807 14.5 19.5M19.5 19.5H22M14.5 19.5H2M9.5 12L22 12M19.5 4.5C19.5 3.11929 18.3807 2 17 2C15.6193 2 14.5 3.11929 14.5 4.5M19.5 4.5C19.5 5.88071 18.3807 7 17 7C15.6193 7 14.5 5.88071 14.5 4.5M19.5 4.5H22M14.5 4.5H2"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}
