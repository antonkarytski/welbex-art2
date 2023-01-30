import React, { PropsWithChildren } from 'react'
import AdaptiveGradient from '../../ui/grdients/AdaptiveGradient'
import ScreenHeader, { ScreenHeaderProps } from './ScreenHeader'
import { ScreenHeaderStyles } from './styles'

type WideScreenHeaderProps = {
  style?: ScreenHeaderStyles
  title: string
  backAvailable?: boolean
  headerRight?: ScreenHeaderProps['headerRight']
  gradientStartColor?: string
  gradientEndColor?: string
}

const ScreenTopBlock = React.memo(
  ({
    style,
    title,
    backAvailable,
    children,
    headerRight,
    gradientEndColor,
    gradientStartColor,
  }: PropsWithChildren<WideScreenHeaderProps>) => {
    return (
      <AdaptiveGradient
        startColor={gradientStartColor}
        endColor={gradientEndColor}
      >
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
