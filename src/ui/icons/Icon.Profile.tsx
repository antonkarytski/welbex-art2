import React from 'react'
import Svg, { Path } from 'react-native-svg'
import { IconProps } from './_types'

export default function ProfileIcon({
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
        d="M3.35671 17.4486C5.61407 16.1727 8.222 15.4444 11 15.4444C13.778 15.4444 16.3859 16.1727 18.6433 17.4486M14.3333 8.77778C14.3333 10.6187 12.8409 12.1111 11 12.1111C9.15905 12.1111 7.66667 10.6187 7.66667 8.77778C7.66667 6.93683 9.15905 5.44444 11 5.44444C12.8409 5.44444 14.3333 6.93683 14.3333 8.77778ZM21 11C21 16.5228 16.5228 21 11 21C5.47715 21 1 16.5228 1 11C1 5.47715 5.47715 1 11 1C16.5228 1 21 5.47715 21 11Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}
