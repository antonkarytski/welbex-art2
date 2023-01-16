import React from 'react'
import { View } from 'react-native'
import Svg, { Path } from 'react-native-svg'
import { IconProps } from 'altek-ui'

type StarsImageProps = { secondaryColor?: string } & IconProps

const StarsImage = ({
  color = '#B4DCD8',
  secondaryColor = '#84BDBE',
  size = 93,
  style,
}: StarsImageProps) => {
  return (
    <View style={style}>
      <Svg
        style={style}
        width={size * 1.2}
        height={size}
        viewBox="0 0 112 93"
        fill="none"
      >
        <Path
          d="M29.209 8.99683C28.1703 8.52203 22.2553 3.18733 17.7907 0.91884"
          stroke={color}
        />
        <Path
          d="M81.9922 18.4006C83.4173 17.6902 86.6636 15.5243 88.2484 12.5439"
          stroke={color}
        />
        <Path
          d="M1 55.0403C2.20889 54.5225 5.57223 53.5872 9.35444 53.9884"
          stroke={color}
        />
        <Path
          d="M45.2236 92C46.0991 90.65 47.8216 87.1027 47.7073 83.7134"
          stroke={color}
        />
        <Path
          d="M97.7959 63.2629C99.8599 64.3634 105.39 66.4094 111 65.7903"
          stroke={color}
        />
        <Path
          d="M57.9679 21.8921C58.696 20.3862 60.841 20.3862 61.5691 21.8922L67.7015 34.5759C67.9894 35.1713 68.5529 35.5859 69.2069 35.6835L82.9913 37.7404C84.6182 37.9832 85.2727 39.9769 84.1063 41.1367L74.083 51.1038C73.623 51.5613 73.4134 52.2135 73.5209 52.8533L75.8788 66.8888C76.1542 68.5284 74.4251 69.7687 72.9604 68.9822L60.7146 62.4075C60.1238 62.0902 59.4133 62.0902 58.8224 62.4075L46.5767 68.9822C45.1119 69.7687 43.3828 68.5284 43.6582 66.8888L46.0161 52.8533C46.1236 52.2135 45.914 51.5613 45.454 51.1038L35.4307 41.1367C34.2643 39.9769 34.9188 37.9832 36.5458 37.7404L50.3301 35.6835C50.9841 35.5859 51.5476 35.1713 51.8355 34.5759L57.9679 21.8921Z"
          fill={secondaryColor}
        />
        <Path
          d="M48.091 21.8921C48.8191 20.3862 50.9641 20.3862 51.6921 21.8922L57.8246 34.5759C58.1124 35.1713 58.6759 35.5859 59.33 35.6835L73.1143 37.7404C74.7412 37.9832 75.3958 39.9769 74.2294 41.1367L64.2061 51.1038C63.746 51.5613 63.5365 52.2135 63.644 52.8533L66.0018 66.8888C66.2773 68.5284 64.5482 69.7687 63.0834 68.9822L50.8376 62.4075C50.2468 62.0902 49.5363 62.0902 48.9455 62.4075L36.6997 68.9822C35.2349 69.7687 33.5058 68.5284 33.7813 66.8888L36.1391 52.8533C36.2466 52.2135 36.0371 51.5613 35.577 51.1038L25.5538 41.1367C24.3873 39.9769 25.0419 37.9832 26.6688 37.7404L40.4531 35.6835C41.1072 35.5859 41.6707 35.1713 41.9585 34.5759L48.091 21.8921Z"
          fill={color}
        />
      </Svg>
    </View>
  )
}

export default StarsImage