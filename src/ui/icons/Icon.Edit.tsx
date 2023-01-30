import React from 'react'
import Svg, { Path } from 'react-native-svg'
import { IconProps } from './_types'

export default function EditIcon({
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
        d="M15.4619 6.43547C15.7407 6.15664 16.1189 6 16.5132 6C16.7085 6 16.9018 6.03846 17.0822 6.11318C17.2626 6.18789 17.4265 6.29741 17.5645 6.43547C17.7026 6.57353 17.8121 6.73744 17.8868 6.91782C17.9615 7.09821 18 7.29154 18 7.48679C18 7.68204 17.9615 7.87538 17.8868 8.05576C17.8121 8.23615 17.7026 8.40005 17.5645 8.53811L8.80352 17.2991L6 18L6.70088 15.1965L15.4619 6.43547Z"
        stroke={color}
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M13 18H18"
        stroke={color}
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}
