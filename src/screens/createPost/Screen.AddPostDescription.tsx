import React from 'react'
import { StyleSheet, View } from 'react-native'
import CreatePostForm from '../../features/createPost/CreatePostForm'
import { useThemedStyleList } from '../../features/themed/hooks'
import GradientScreenHeader from '../../navigation/elements/GradientScreenHeader'
import { links } from '../../navigation/links'
import { ScreenComponentProps } from '../../navigation/types.screenProps'
import { themedPrimaryGradient } from '../../styles/gradients'
import { useText } from '../../translations/hook'

export default function AddPostDescriptionScreen({
  route,
}: ScreenComponentProps<links.createPostAddDescription>) {
  const text = useText()
  const { styles } = useThemedStyleList({
    gradient: themedPrimaryGradient,
  })

  return (
    <View style={commonStyles.container}>
      <GradientScreenHeader
        gradient={{ colors: styles.gradient }}
        backAvailable
        title={text.description}
      />
      <CreatePostForm
        initialAssets={route.params.assets}
        category={route.params.category}
      />
    </View>
  )
}

const commonStyles = StyleSheet.create({
  container: { flex: 1 },
})
