import React from 'react'
import { StyleSheet, View } from 'react-native'
import UploadFromCameraBlock from '../../features/imagePick/Block.UploadFromCamera'
import UploadFromCameraRollBlock from '../../features/imagePick/Block.UploadFromCameraRoll'
import { createThemedStyle } from '../../features/themed'
import { useThemedStyleList } from '../../features/themed/hooks'
import ScreenHeader from '../../navigation/elements/ScreenHeader'
import { ScreenHeaderStyles } from '../../navigation/elements/styles'

export default function UploadPostImageScreen() {
  const { styles } = useThemedStyleList({
    header: headerThemedStyles,
    common: themedStyle,
  })

  return (
    <View>
      <ScreenHeader style={styles.header} title={'Upload Image'} />
      <View style={styles.common.contentContainer}>
        <UploadFromCameraRollBlock style={styles.common.cameraRollBlock} />
        <UploadFromCameraBlock />
      </View>
    </View>
  )
}

const themedStyle = createThemedStyle(() =>
  StyleSheet.create({
    contentContainer: {
      paddingHorizontal: 20,
    },
    cameraRollBlock: {
      marginBottom: 20,
    },
  })
)

const headerThemedStyles = createThemedStyle<ScreenHeaderStyles>((colors) =>
  StyleSheet.create({
    container: {
      backgroundColor: colors.primary1,
    },
    line: {
      marginBottom: 32,
    },
  })
)
