import React from 'react'
import Svg, { Path } from 'react-native-svg'
import { IconProps } from './_types'

export default function FilterIcon({
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
        d="M19 4H5C4.44772 4 4 4.44772 4 5V6.58579C4 6.851 4.10536 7.10536 4.29289 7.29289L9.70711 12.7071C9.89464 12.8946 10 13.149 10 13.4142V19.382C10 20.1253 10.7823 20.6088 11.4472 20.2764L13.4472 19.2764C13.786 19.107 14 18.7607 14 18.382V13.4142C14 13.149 14.1054 12.8946 14.2929 12.7071L19.7071 7.29289C19.8946 7.10536 20 6.851 20 6.58579V5C20 4.44772 19.5523 4 19 4Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}
