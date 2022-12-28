import React from 'react'
import Svg, { Path } from 'react-native-svg'
import { IconProps } from './_types'

type PlusIconProps = {
  variant?: 'thin' | 'regular'
} & IconProps

export default function PlusIcon({
  size = 22,
  color = '#303535',
  style,
  variant = 'regular',
}: PlusIconProps) {
  if (variant === 'thin') {
    return (
      <Svg width={size} height={size} viewBox="0 0 23 23" fill="none">
        <Path
          d="M11.7141 1.71436V21.7144"
          stroke={color}
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M1.71436 11.7144H21.7144"
          stroke={color}
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    )
  }

  return (
    <Svg
      style={style}
      width={size * 1.1}
      height={size}
      viewBox="0 0 23 22"
      fill="none"
    >
      <Path
        d="M11.5 21C17.0228 21 21.5 16.5228 21.5 11C21.5 5.47715 17.0228 1 11.5 1C5.97715 1 1.5 5.47715 1.5 11C1.5 16.5228 5.97715 21 11.5 21Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M11.5 7V15"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M7.5 11H15.5"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}
