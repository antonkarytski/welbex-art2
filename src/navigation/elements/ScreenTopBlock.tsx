import React, { PropsWithChildren } from 'react'
import AdaptiveGradient from '../../ui/gradients/AdaptiveGradient'
import { GradientColors } from '../../ui/gradients/Gradient'
import ScreenHeader, { ScreenHeaderProps } from './ScreenHeader'
import { ScreenHeaderStyles } from './styles'

type WideScreenHeaderProps = {
  style?: ScreenHeaderStyles
  title: string
  backAvailable?: boolean
  headerRight?: ScreenHeaderProps['headerRight']
  gradientColors?: GradientColors
}

const ScreenTopBlock = React.memo(
  ({
    style,
    title,
    backAvailable,
    children,
    headerRight,
    gradientColors,
  }: PropsWithChildren<WideScreenHeaderProps>) => {
    return (
      <AdaptiveGradient colors={gradientColors}>
        <ScreenHeader
          backAvailable={backAvailable}
          style={{
            title: style?.title,
            line: style?.line,
          }}
          title={title}
          headerRight={headerRight}
        />
        {children}
      </AdaptiveGradient>
    )
  }
)

export default ScreenTopBlock
