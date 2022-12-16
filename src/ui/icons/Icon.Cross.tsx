import Svg, { Path , G, Defs, ClipPath, Rect } from 'react-native-svg'
import { IIconProps } from './_types'

export default function CrossIcon({size = 16, color = "#F76161", style }: IIconProps) {
	return (
		<Svg
			width={size}
			height={size}
			style={style}
			fill="none"
			viewBox="0 0 16 16"
		>
			<G clip-path="url(#clip0_457_2594)">
			<Path d="M7.99967 14.6666C11.6816 14.6666 14.6663 11.6819 14.6663 7.99998C14.6663 4.31808 11.6816 1.33331 7.99967 1.33331C4.31778 1.33331 1.33301 4.31808 1.33301 7.99998C1.33301 11.6819 4.31778 14.6666 7.99967 14.6666Z" stroke={color} stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
			<Path d="M10 6L6 10" stroke={color} stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
			<Path d="M6 6L10 10" stroke={color} stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
			</G>
			<Defs>
			<ClipPath id="clip0_457_2594">
			<Rect width={size} height={size} fill="white"/>
			</ClipPath>
			</Defs>
	</Svg>)
}