import React from 'react'
import Svg, { Path, Rect } from 'react-native-svg'
import { IconProps } from './_types'

type CameraIconProps = IconProps &
  (
    | {
        variant?: 'regular'
        frameColor?: never
      }
    | {
        variant: 'framed'
        frameColor?: string
      }
  )

export default function CameraIcon({
  variant,
  size = variant === 'framed' ? 100 : 24,
  color = '#303535',
  style,
  frameColor,
}: CameraIconProps) {
  if (variant === 'framed') {
    return (
      <Svg width={size} height={size} viewBox="0 0 100 100" fill="none">
        <Path
          d="M61 57C61 57.5304 60.7893 58.0391 60.4142 58.4142C60.0391 58.7893 59.5304 59 59 59H41C40.4696 59 39.9609 58.7893 39.5858 58.4142C39.2107 58.0391 39 57.5304 39 57V46C39 45.4696 39.2107 44.9609 39.5858 44.5858C39.9609 44.2107 40.4696 44 41 44H45L47 41H53L55 44H59C59.5304 44 60.0391 44.2107 60.4142 44.5858C60.7893 44.9609 61 45.4696 61 46V57Z"
          stroke={color}
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M50 55C52.2091 55 54 53.2091 54 51C54 48.7909 52.2091 47 50 47C47.7909 47 46 48.7909 46 51C46 53.2091 47.7909 55 50 55Z"
          stroke={color}
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Rect
          x="0.5"
          y="0.5"
          width="99"
          height="99"
          rx="19.5"
          stroke={frameColor}
          strokeDasharray="60 60"
        />
      </Svg>
    )
  }
  //"#B2BEBD"
  return (
    <Svg
      width={size}
      height={size}
      style={style}
      fill="none"
      viewBox="0 0 24 24"
    >
      <Path
        d="M23 19C23 19.5304 22.7893 20.0391 22.4142 20.4142C22.0391 20.7893 21.5304 21 21 21H3C2.46957 21 1.96086 20.7893 1.58579 20.4142C1.21071 20.0391 1 19.5304 1 19V8C1 7.46957 1.21071 6.96086 1.58579 6.58579C1.96086 6.21071 2.46957 6 3 6H7L9 3H15L17 6H21C21.5304 6 22.0391 6.21071 22.4142 6.58579C22.7893 6.96086 23 7.46957 23 8V19Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M12 17C14.2091 17 16 15.2091 16 13C16 10.7909 14.2091 9 12 9C9.79086 9 8 10.7909 8 13C8 15.2091 9.79086 17 12 17Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}
