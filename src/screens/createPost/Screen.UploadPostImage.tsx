import React from 'react'
import { StyleSheet, View } from 'react-native'
import UploadFromCameraBlock from '../../features/imagePick/Block.UploadFromCamera'
import UploadFromCameraRollBlock from '../../features/imagePick/Block.UploadFromCameraRoll'
import { createThemedStyle } from '../../features/themed'
import { useThemedStyleList } from '../../features/themed/hooks'
import ScreenHeader from '../../navigation/elements/ScreenHeader'
import { primaryHeaderThemedStyles } from '../../navigation/elements/styles'
import { themedShadow5Style } from '../../styles/shadows'
import { useText } from '../../translations/hook'

export default function UploadPostImageScreen() {
  const text = useText()
  const { styles } = useThemedStyleList({
    header: primaryHeaderThemedStyles,
    common: themedStyle,
  })

  return (
    <View>
      <ScreenHeader style={styles.header} title={text.uploadImage} />
      <View style={styles.common.contentContainer}>
        <UploadFromCameraRollBlock style={styles.common.cameraRollBlock} />
        <UploadFromCameraBlock
          style={styles.common.uploadFromCameraBlock}
          label={text.scanWork}
        />
      </View>
    </View>
  )
}

const themedStyle = createThemedStyle((colors) =>
  StyleSheet.create({
    uploadFromCameraBlock: themedShadow5Style(colors),
    contentContainer: {
      paddingHorizontal: 20,
      marginTop: 32,
    },
    cameraRollBlock: {
      marginBottom: 20,
    },
  })
)
