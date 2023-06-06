import React from 'react'
import Svg, { Path } from 'react-native-svg'
import { IconProps } from './_types'

export default function CrownIcon({
  size = 18,
  color = '#FFD964',
  style,
}: IconProps) {
  return (
    <Svg
      style={style}
      width={size * 1.2}
      height={size}
      viewBox="0 0 22 18"
      fill="none"
    >
      <Path
        d="M21.1808 5.28786C20.9749 5.10738 20.7198 4.99247 20.4482 4.95787C20.1766 4.92327 19.9009 4.97055 19.6563 5.09364L15.6258 7.10286L12.1883 1.38888C12.0652 1.18443 11.8913 1.01528 11.6835 0.897869C11.4757 0.780453 11.2411 0.71875 11.0024 0.71875C10.7637 0.71875 10.5291 0.780453 10.3213 0.897869C10.1135 1.01528 9.93959 1.18443 9.81644 1.38888L6.37894 7.10286L2.34761 5.0945C2.10329 4.97245 1.82831 4.92544 1.55732 4.95938C1.28632 4.99333 1.03144 5.10672 0.824771 5.28527C0.618104 5.46382 0.468902 5.69953 0.395961 5.96273C0.32302 6.22592 0.329603 6.50481 0.414881 6.76427L3.59457 16.5053C3.64246 16.652 3.72268 16.7862 3.82933 16.8978C3.93597 17.0094 4.06631 17.0956 4.21073 17.1502C4.35515 17.2047 4.50997 17.2261 4.66377 17.2128C4.81756 17.1995 4.96641 17.1518 5.09933 17.0733C5.11996 17.0613 7.25293 15.8436 11.0007 15.8436C14.7484 15.8436 16.8814 17.063 16.8977 17.0725C17.0306 17.152 17.1798 17.2005 17.334 17.2145C17.4883 17.2285 17.6437 17.2076 17.7888 17.1532C17.9338 17.0989 18.0648 17.0126 18.1719 16.9007C18.2791 16.7889 18.3596 16.6543 18.4076 16.507L21.5873 6.77114C21.6751 6.51154 21.6833 6.23164 21.6108 5.96735C21.5384 5.70307 21.3887 5.46645 21.1808 5.28786ZM16.804 14.7711C15.6568 14.3311 13.6819 13.7811 11.0007 13.7811C8.31941 13.7811 7.52621 13.6328 6.37894 14.0728L2.87699 7.66489L5.78579 14.564C11.0007 13.7811 10.1608 14.17 10.4948 14.0728C10.8289 13.9756 10.3213 7.96069 8.7998 8.34973L10.3213 13.793L15.6258 14.9497C15.8065 15.247 17.6054 14.674 17.9395 14.7711C18.2736 14.8681 18.3879 10.704 18.6998 10.5497L19.1235 7.66231L16.804 14.7711Z"
        fill={color}
      />
    </Svg>
  )
}