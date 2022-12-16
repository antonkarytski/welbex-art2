import Svg, { Path } from 'react-native-svg'
import { IIconProps } from './_types'

export default function OutComingArrowIcon({ size = 24, color = '#303535' , style }: IIconProps) {
	return (
		<Svg
			width={size}
			height={size}
			style={style}
			fill='none'
			viewBox='0 0 24 24'
		>
			<Path d="M16 17L21 12L16 7" stroke={color} stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
			<Path d="M21 12H9" stroke={color} stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
			<Path d="M9 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H9" stroke={color} stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>	

		</Svg>
	)
}