import React from 'react'
import { StyleSheet } from 'react-native'
import Svg, { Path } from 'react-native-svg'
import { IconProps } from './_types'

const WinnerIcon = ({ size = 35, color = '#FFD100', style }: IconProps) => {
  return (
    <Svg
      style={style}
      width={size}
      height={size * 1.34}
      viewBox="0 0 35 47"
      fill="none"
    >
      <Path d="M0 0H35V47L17.5 37.5096L0 47V0Z" fill={color} />
      <Path
        d="M17.5 11L20.1265 16.5952L26 17.4979L21.75 21.8507L22.753 28L17.5 25.0952L12.247 28L13.25 21.8507L9 17.4979L14.8735 16.5952L17.5 11Z"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export const winnersIconStyles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 20,
    zIndex: 2,
  },
})

export default WinnerIcon
