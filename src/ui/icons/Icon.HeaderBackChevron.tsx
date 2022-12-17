import React from 'react'
import Svg, { Path } from 'react-native-svg'
import { IconProps } from './_types'

const HeaderBackChevronIcon = ({
  style,
  color = '#fff',
  size = 9,
}: IconProps) => {
  return (
    <Svg
      width={size}
      height={size * 1.78}
      style={style}
      viewBox="0 0 9 16"
      fill="none"
    >
      <Path
        d="M7.29289 15.7071C7.68342 16.0976 8.31658 16.0976 8.70711 15.7071C9.09763 15.3166 9.09763 14.6834 8.70711 14.2929L7.29289 15.7071ZM1 8L0.292893 7.29289C-0.0976311 7.68342 -0.0976311 8.31658 0.292893 8.70711L1 8ZM8.70711 1.70711C9.09763 1.31658 9.09763 0.683417 8.70711 0.292893C8.31658 -0.0976311 7.68342 -0.0976311 7.29289 0.292893L8.70711 1.70711ZM8.70711 14.2929L1.70711 7.29289L0.292893 8.70711L7.29289 15.7071L8.70711 14.2929ZM1.70711 8.70711L8.70711 1.70711L7.29289 0.292893L0.292893 7.29289L1.70711 8.70711Z"
        fill={color}
      />
    </Svg>
  )
}

export default HeaderBackChevronIcon
