import React, { PropsWithChildren, useState } from 'react'
import { View } from 'react-native'
import Gradient from './Gradient'
import { GradientsProps } from './types'

const AdaptiveGradient = ({
  children,
  ...props
}: PropsWithChildren<GradientsProps>) => {
  const [height, setHeight] = useState(0)

  if (!height) {
    return (
      <View
        onLayout={({ nativeEvent }) => setHeight(nativeEvent.layout.height)}
      >
        {children}
      </View>
    )
  }

  return (
    <View style={{ height }}>
      <Gradient {...props}>{children}</Gradient>
    </View>
  )
}

export default AdaptiveGradient
