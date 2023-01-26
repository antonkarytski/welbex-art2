import React from 'react'
import Svg, { Path } from 'react-native-svg'
import { SVGImageProps } from './_types'

const TrashImage = ({
  size = 117,
  color = '#B4DCD8',
  secondaryColor = '#84BDBE',
}: SVGImageProps) => {
  return (
    <Svg width={size * 1.27} height={size} viewBox="0 0 148 117" fill="none">
      <Path
        d="M52.3428 52.8126H57.7491H101"
        stroke={secondaryColor}
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M65.8587 52.8127V47.4064C65.8587 45.9725 66.4283 44.5974 67.4422 43.5835C68.4561 42.5696 69.8312 42 71.265 42H82.0778C83.5116 42 84.8867 42.5696 85.9006 43.5835C86.9145 44.5974 87.4841 45.9725 87.4841 47.4064V52.8127M95.5937 52.8127V90.6572C95.5937 92.0911 95.0241 93.4662 94.0102 94.4801C92.9963 95.494 91.6212 96.0636 90.1873 96.0636H63.1555C61.7216 96.0636 60.3465 95.494 59.3326 94.4801C58.3187 93.4662 57.7491 92.0911 57.7491 90.6572V52.8127H95.5937Z"
        stroke={secondaryColor}
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M47 52.8126H52.4064H95.6572"
        stroke={color}
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M60.5159 52.8127V47.4064C60.5159 45.9725 61.0855 44.5974 62.0994 43.5835C63.1133 42.5696 64.4884 42 65.9223 42H76.735C78.1688 42 79.544 42.5696 80.5579 43.5835C81.5718 44.5974 82.1414 45.9725 82.1414 47.4064V52.8127M90.2509 52.8127V90.6572C90.2509 92.0911 89.6813 93.4662 88.6674 94.4801C87.6535 95.494 86.2784 96.0636 84.8445 96.0636H57.8127C56.3789 96.0636 55.0037 95.494 53.9899 94.4801C52.976 93.4662 52.4064 92.0911 52.4064 90.6572V52.8127H90.2509Z"
        stroke={color}
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M76.735 66.3286V82.5477"
        stroke={color}
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M65.9222 66.3286V82.5477"
        stroke={color}
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M15.5814 18.1426C14.1071 17.0557 6.80627 6.89902 0.563965 1.88403"
        stroke={color}
      />
      <Path
        d="M134.315 50.8275C136.569 51.0692 142.348 50.9061 147.436 48.3197"
        stroke={color}
      />
      <Path
        d="M8.69196 27.5104C10.1763 27.8574 13.9588 29.2945 17.2143 32.2672"
        stroke={color}
      />
      <Path
        d="M123.698 103C125.742 105.873 131.97 112.484 140.527 115.941"
        stroke={color}
      />
    </Svg>
  )
}

export default TrashImage
