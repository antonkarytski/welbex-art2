import React from 'react'
import Svg, { Path } from 'react-native-svg'
import { FilledIconProps } from './_types'

const FavouriteIcon = React.memo(
  ({ size = 20, color = '#303535', style, fill }: FilledIconProps) => {
    return (
      <Svg
        width={size * 0.8}
        height={size}
        viewBox="0 0 16 20"
        fill={fill}
        style={style}
      >
        <Path
          d="M15 19L8 14L1 19V3C1 2.46957 1.21071 1.96086 1.58579 1.58579C1.96086 1.21071 2.46957 1 3 1H13C13.5304 1 14.0391 1.21071 14.4142 1.58579C14.7893 1.96086 15 2.46957 15 3V19Z"
          stroke={color}
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    )
  }
)

export default FavouriteIcon
