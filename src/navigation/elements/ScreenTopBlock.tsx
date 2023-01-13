import React, { PropsWithChildren } from 'react'
import { StyleSheet, View } from 'react-native'
import ScreenHeader from './ScreenHeader'
import { ScreenHeaderStyles } from './styles'

type WideScreenHeaderProps = {
  style?: ScreenHeaderStyles
  title: string
  backAvailable?: boolean
}

const ScreenTopBlock = React.memo(
  ({
    style,
    title,
    backAvailable,
    children,
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
        />
        {children}
      </View>
    )
  }
)

export default ScreenTopBlock
