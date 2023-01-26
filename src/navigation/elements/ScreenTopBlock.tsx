import React, { PropsWithChildren } from 'react'
import { View } from 'react-native'
import ScreenHeader, { ScreenHeaderProps } from './ScreenHeader'
import { ScreenHeaderStyles } from './styles'

type WideScreenHeaderProps = {
  style?: ScreenHeaderStyles
  title: string
  backAvailable?: boolean
  headerRight?: ScreenHeaderProps['headerRight']
}

const ScreenTopBlock = React.memo(
  ({
    style,
    title,
    backAvailable,
    children,
    headerRight,
  }: PropsWithChildren<WideScreenHeaderProps>) => {
    return (
      <View style={style?.container}>
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
      </View>
    )
  }
)

export default ScreenTopBlock
