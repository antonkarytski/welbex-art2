import React from 'react'
import { StyleSheet, View } from 'react-native'
import { createThemedStyle } from '../../features/themed'
import { useThemedStyleList } from '../../features/themed/hooks'
import ScreenHeader from '../../navigation/elements/ScreenHeader'

export default function UploadPostImageScreen() {
  const { styles } = useThemedStyleList({
    header: headerThemedStyles,
  })

  return (
    <View>
      <ScreenHeader style={styles.header} title={'Upload Image'} />
    </View>
  )
}

const themedStyle = createThemedStyle(() => StyleSheet.create({}))

const headerThemedStyles = createThemedStyle((colors) =>
  StyleSheet.create({
    container: {
      backgroundColor: colors.primary1,
    },
  })
)
