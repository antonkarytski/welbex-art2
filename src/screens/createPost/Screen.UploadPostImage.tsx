import React from 'react'
import { StyleSheet, View } from 'react-native'
import UploadFromCameraBlock from '../../features/imagePick/Block.UploadFromCamera'
import UploadFromCameraRollBlock from '../../features/imagePick/Block.UploadFromCameraRoll'
import { createThemedStyle } from '../../features/themed'
import { useThemedStyleList } from '../../features/themed/hooks'
import GradientScreenHeader from '../../navigation/elements/GradientScreenHeader'
import { links } from '../../navigation/links'
import { ScreenComponentProps } from '../../navigation/types.screenProps'
import { themedPrimaryGradient } from '../../styles/gradients'
import { themedShadow5Style } from '../../styles/shadows'
import { useText } from '../../translations/hook'

export default function UploadPostImageScreen({
  route,
}: ScreenComponentProps<links.createPostUploadImage>) {
  const category = route.params?.category
  const text = useText()
  const { styles, colors } = useThemedStyleList({
    common: themedStyle,
    gradient: themedPrimaryGradient,
  })

  return (
    <View>
      <GradientScreenHeader
        title={text.uploadImage}
        gradient={{ colors: styles.gradient }}
      />
      <View style={styles.common.contentContainer}>
        <UploadFromCameraRollBlock
          style={styles.common.cameraRollBlock}
          category={category}
        />
        <UploadFromCameraBlock
          style={styles.common.uploadFromCameraBlock}
          label={text.scanWork}
          category={category}
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
