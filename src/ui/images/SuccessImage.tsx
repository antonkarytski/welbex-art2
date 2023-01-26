import React from 'react'
import Svg, { Path } from 'react-native-svg'
import { SVGImageProps } from './_types'

const SuccessImage = ({
  size = 117,
  color = '#B4DCD8',
  secondaryColor = '#84BDBE',
}: SVGImageProps) => {
  return (
    <Svg width={size * 1.27} height={size} viewBox="0 0 148 117" fill="none">
      <Path
        d="M99.5953 47.938L64.8584 83.938L49.069 67.5744"
        stroke={secondaryColor}
        strokeWidth="11"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M90.1215 47.938L55.3847 83.938L39.5952 67.5744"
        stroke={color}
        strokeWidth="11"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M15.5813 18.1426C14.1071 17.0557 6.80621 6.89902 0.563904 1.88403"
        stroke={color}
      />
      <Path
        d="M134.315 50.8276C136.569 51.0694 142.348 50.9062 147.436 48.3198"
        stroke={color}
      />
      <Path
        d="M8.69189 27.5103C10.1762 27.8573 13.9587 29.2944 17.2143 32.267"
        stroke={color}
      />
      <Path
        d="M123.698 103C125.742 105.873 131.97 112.484 140.527 115.941"
        stroke={color}
      />
    </Svg>
  )
}

export default SuccessImage
