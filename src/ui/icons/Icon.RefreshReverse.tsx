import React from 'react'
import Svg, { Path } from 'react-native-svg'
import { IconProps } from './_types'

const RefreshReverseIcon = ({
  size = 13,
  color = '#303535',
  style,
}: IconProps) => {
  return (
    <Svg
      style={[style, { transform: [{ rotateX: '180deg' }] }]}
      width={size * 1.15}
      height={size}
      viewBox="0 0 15 13"
      fill="none"
    >
      <Path
        d="M1.08301 11.1667V7.66675H4.58301"
        stroke={color}
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M13.917 1.83325V5.33325H10.417"
        stroke={color}
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M2.54717 4.75008C2.84302 3.91404 3.34584 3.16657 4.0087 2.57741C4.67156 1.98825 5.47286 1.57661 6.33784 1.3809C7.20282 1.18519 8.10328 1.21178 8.9552 1.4582C9.80712 1.70462 10.5827 2.16283 11.2097 2.79008L13.9163 5.33342M1.08301 7.66675L3.78967 10.2101C4.41661 10.8373 5.19223 11.2955 6.04415 11.542C6.89607 11.7884 7.79653 11.815 8.66151 11.6193C9.52649 11.4236 10.3278 11.0119 10.9907 10.4228C11.6535 9.8336 12.1563 9.08613 12.4522 8.25009"
        stroke={color}
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export default RefreshReverseIcon
