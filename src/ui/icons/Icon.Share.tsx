import React from 'react'
import Svg, { Path } from 'react-native-svg'
import { IconProps } from './_types'

const ShareIcon = React.memo(
  ({ size = 20, color = '#303535', style }: IconProps) => {
    return (
      <Svg
        width={size}
        height={size}
        viewBox="0 0 20 20"
        style={style}
        fill="none"
      >
        <Path
          d="M16 19C17.6569 19 19 17.6569 19 16C19 14.3431 17.6569 13 16 13C14.3431 13 13 14.3431 13 16C13 17.6569 14.3431 19 16 19Z"
          stroke={color}
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M7 11.5L13 14.5"
          stroke={color}
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M4 13C5.65685 13 7 11.6569 7 10C7 8.34315 5.65685 7 4 7C2.34315 7 1 8.34315 1 10C1 11.6569 2.34315 13 4 13Z"
          stroke={color}
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M13 5.5L7 8.5"
          stroke={color}
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M16 7C17.6569 7 19 5.65685 19 4C19 2.34315 17.6569 1 16 1C14.3431 1 13 2.34315 13 4C13 5.65685 14.3431 7 16 7Z"
          stroke={color}
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    )
  }
)

export default ShareIcon
