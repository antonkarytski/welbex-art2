import React from 'react'
import { StyleSheet, View } from 'react-native'
import PostCreateSourcePicker from '../../features/createPost/PostCreateSourcePicker'
import { useCreatePostRedirection } from '../../features/createPost/hook.createPostRedirection'
import { useThemedStyleList } from '../../features/themed/hooks'
import GradientScreenHeader from '../../navigation/elements/GradientScreenHeader'
import { links } from '../../navigation/links'
import { ScreenComponentProps } from '../../navigation/types.screenProps'
import { themedPrimaryGradient } from '../../styles/gradients'
import { useText } from '../../translations/hook'

export default function UploadPostImageScreen({
  route,
}: ScreenComponentProps<links.createPostUploadImage>) {
  const category = route.params?.category
  const text = useText()
  const { styles: headerStyles } = useThemedStyleList({
    gradient: themedPrimaryGradient,
  })
  useCreatePostRedirection()

  return (
    <View style={styles.container}>
      <GradientScreenHeader
        title={text.uploadImage}
        gradient={{ colors: headerStyles.gradient }}
      />
      <View style={styles.contentContainer}>
        <PostCreateSourcePicker initialCategory={category} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 20,
    marginTop: 32,
  },
})
