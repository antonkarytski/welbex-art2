import React from 'react'
import { View } from 'react-native'
import { useThemedStyleList } from '../../features/themed/hooks'
import ScreenHeader from '../../navigation/elements/ScreenHeader'
import { primaryHeaderThemedStyles } from '../../navigation/elements/styles'
import { useText } from '../../translations/hook'

export default function AddPostDescriptionScreen() {
  const text = useText()
  const { styles } = useThemedStyleList({
    header: primaryHeaderThemedStyles,
  })

  return (
    <View>
      <ScreenHeader
        backAvailable
        title={text.description}
        style={styles.header}
      />
    </View>
  )
}
