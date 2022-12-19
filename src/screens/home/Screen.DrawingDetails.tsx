import { NativeStackScreenProps } from '@react-navigation/native-stack'
import React from 'react'
import { Dimensions, ScrollView, StyleSheet, View } from 'react-native'
import AutoHeightImage from '../../features/images/AutoHeightImage'
import { createThemedStyle } from '../../features/themed'
import { useThemedStyleList } from '../../features/themed/hooks'
import UserCardPreview from '../../features/user/UserCardPreview'
import AppHeader from '../../navigation/elements/AppHeader'
import { ScreenHeaderStyles } from '../../navigation/elements/styles'
import { links } from '../../navigation/links'
import { ScreensProps } from '../../navigation/types.screenProps'
import { themedShadow5Style } from '../../styles/shadows'
import PresetButton from '../../ui/buttons/PresetButton'

const DrawingDetailsScreen = ({
  route,
}: NativeStackScreenProps<ScreensProps, links.drawingDetails>) => {
  const drawing = route.params.item
  const { styles } = useThemedStyleList({
    common: themedStyles,
    header: themedHeaderStyles,
  })

  return (
    <View style={styles.common.container}>
      <AppHeader style={styles.header} />

      <ScrollView bounces={false} style={styles.common.contentContainer}>
        <UserCardPreview item={drawing.user} />
        <AutoHeightImage
          image={drawing.image}
          widthGenerator={() => {
            const screen = Dimensions.get('screen')
            return screen.width - 40
          }}
        />
        <PresetButton
          style={styles.common.downloadButton}
          label={'Download'}
          onPress={() => {}}
        />
      </ScrollView>
    </View>
  )
}

const themedHeaderStyles = createThemedStyle<ScreenHeaderStyles>((colors) =>
  StyleSheet.create({
    title: {
      color: colors.text,
    },
    line: {
      backgroundColor: colors.darkLine,
    },
  })
)

const themedStyles = createThemedStyle((colors) =>
  StyleSheet.create({
    container: { flex: 1 },
    contentContainer: {
      paddingHorizontal: 20,
    },
    image: themedShadow5Style(colors),
    downloadButton: {
      marginTop: 37,
      marginBottom: 24,
    },
  })
)

export default DrawingDetailsScreen
