import Svg, { Path } from 'react-native-svg'
import { IIconProps } from './_types'

export default function PlusIcon({ size = 24 , color =  '#303535', style}: IIconProps) {
	return (
		<Svg
			width={size}
			height={size}
			style={style}
			fill="none"
			viewBox="0 0 24 24"
		>
			<Path d="M12 5V19" stroke={color} stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
			<Path d="M5 12H19" stroke={color} stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
		</Svg>
	)
}