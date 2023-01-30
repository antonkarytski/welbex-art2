import React from 'react'
import { StyleSheet, View } from 'react-native'
import UploadFromCameraBlock from '../../features/imagePick/Block.UploadFromCamera'
import UploadFromCameraRollBlock from '../../features/imagePick/Block.UploadFromCameraRoll'
import { createThemedStyle } from '../../features/themed'
import { useThemedStyleList } from '../../features/themed/hooks'
import ScreenHeader from '../../navigation/elements/ScreenHeader'
import { themedShadow5Style } from '../../styles/shadows'
import { useText } from '../../translations/hook'
import AdaptiveGradient from '../../ui/gradients/AdaptiveGradient'
import { primaryGradientPreset } from '../../ui/gradients/styles'

export default function UploadPostImageScreen() {
  const text = useText()
  const { styles, colors } = useThemedStyleList({
    common: themedStyle,
  })
  const gradient = primaryGradientPreset(colors)

  return (
    <View>
      <AdaptiveGradient startColor={gradient.start} endColor={gradient.end}>
        <ScreenHeader title={text.uploadImage} />
      </AdaptiveGradient>
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
