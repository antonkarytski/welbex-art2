import React from 'react'
import Svg, { ClipPath, Defs, G, Path, Rect } from 'react-native-svg'
import { IconProps } from './_types'

export default function SuccessIcon({
  size = 16,
  color = '#439F6E',
  style,
}: IconProps) {
  return (
    <Svg
      width={size}
      height={size}
      style={style}
      viewBox={'0 0 16 16'}
      fill="none"
    >
      <G clip-path="url(#clip0_457_2615)">
        <Path
          d="M14.6663 7.38668V8.00001C14.6655 9.43763 14.2 10.8365 13.3392 11.9879C12.4785 13.1393 11.2685 13.9817 9.88991 14.3893C8.5113 14.7969 7.03785 14.7479 5.68932 14.2497C4.3408 13.7515 3.18944 12.8307 2.40698 11.6247C1.62452 10.4187 1.25287 8.99205 1.34746 7.55755C1.44205 6.12305 1.99781 4.75756 2.93186 3.66473C3.86591 2.57189 5.1282 1.81027 6.53047 1.49344C7.93274 1.17662 9.39985 1.32157 10.713 1.90668"
          stroke={color}
          stroke-width="1.6"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <Path
          d="M14.6667 2.66669L8 9.34002L6 7.34002"
          stroke={color}
          stroke-width="1.6"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_457_2615">
          <Rect width="16" height="16" fill="white" />
        </ClipPath>
      </Defs>
    </Svg>
  )
}
