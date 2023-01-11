import React from 'react'
import { StyleSheet, View } from 'react-native'
import ScreenHeader from './ScreenHeader'
import { ScreenHeaderStyles } from './styles'

type WideScreenHeaderProps = {
  style?: ScreenHeaderStyles
  label: string
  backAvailable?: boolean
}

const WideScreenHeader = React.memo(
  ({ style, label, backAvailable }: WideScreenHeaderProps) => {
    return (
      <View style={[styles.container, style?.container]}>
        <ScreenHeader
          backAvailable={backAvailable}
          style={{
            title: style?.title,
            line: style?.line,
          }}
          title={label}
        />
      </View>
    )
  }
)

const styles = StyleSheet.create({
  container: {
    paddingBottom: 80,
  },
})

export default WideScreenHeader
