import React from 'react'
import { Image, ScrollView, StyleSheet, View } from 'react-native'
import { createThemedStyle } from '../../features/themed'
import { useThemedStyleList } from '../../features/themed/hooks'
import ScreenHeader from '../../navigation/elements/ScreenHeader'
import { primaryHeaderThemedStyles } from '../../navigation/elements/styles'
import { links } from '../../navigation/links'
import { RouterScreenProps } from '../../navigation/types.screenProps'
import { useText } from '../../translations/hook'
import Span from '../../ui/Span'

export default function AddPostDescriptionScreen({
  route,
}: RouterScreenProps<links.createPostAddDescription>) {
  const assets = route.params.asset
  const text = useText()
  const { styles } = useThemedStyleList({
    header: primaryHeaderThemedStyles,
    common: themedStyles,
  })

  return (
    <ScrollView>
      <ScreenHeader
        backAvailable
        title={text.description}
        style={styles.header}
      />
      <Image
        source={{ uri: assets[0].uri }}
        style={{ width: 150, height: 150 }}
      />
      <Span label={text.completeDescription} />
    </ScrollView>
  )
}

const themedStyles = createThemedStyle((colors) => StyleSheet.create({}))
