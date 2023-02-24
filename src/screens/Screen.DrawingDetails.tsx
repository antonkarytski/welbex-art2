import { useStore } from 'effector-react'
import React, { useEffect } from 'react'
import { Dimensions, ScrollView, StyleSheet, View } from 'react-native'
import DrawingInteractionPanel from '../features/drawing/DrawingInteractivePanel'
import { artWorkRequest } from '../features/drawing/request'
import AutoHeightImage from '../features/images/AutoHeightImage'
import { createThemedStyle } from '../features/themed'
import { useThemedStyleList } from '../features/themed/hooks'
import UserCardPreview from '../features/user/UserCardPreview'
import { useNavigate } from '../navigation'
import AppHeader from '../navigation/elements/AppHeader'
import { transparentThemedHeaderStyles } from '../navigation/elements/styles'
import { links } from '../navigation/links'
import { ScreenComponentProps } from '../navigation/types.screenProps'
import { themedShadow5Style } from '../styles/shadows'
import { useText } from '../translations/hook'
import Loader from '../ui/Loader'
import PresetButton from '../ui/buttons/PresetButton'

const DrawingDetailsScreen = ({
  route,
}: ScreenComponentProps<
  links.drawingDetails | links.galleryDrawingDetails
>) => {
  const navigate = useNavigate()
  const text = useText()
  const drawingId = route.params.item.id
  const drawing = useStore(artWorkRequest.$data)
  const isLoading = useStore(artWorkRequest.$isLoading)

  const { styles, colors } = useThemedStyleList({
    common: themedStyles,
    header: transparentThemedHeaderStyles,
  })

  useEffect(() => {
    artWorkRequest.get(drawingId)
  }, [drawingId])

  if (isLoading) return <Loader />
  if (!drawing) return null

  return (
    <View style={styles.common.container}>
      <AppHeader
        style={styles.header}
        backAvailable
        settingsAvailable
        iconsColor={colors.appHeaderIconDark}
      />

      <ScrollView bounces={false} style={styles.common.contentContainer}>
        <UserCardPreview
          onAvatarPress={(item) => {
            navigate(links.userProfile, { item })
          }}
          onSubscribePress={() => {
            navigate(links.subscriptionCurrent)
          }}
          item={drawing.author}
        />
        <AutoHeightImage
          image={{ uri: drawing.image_thumbnail }}
          widthGenerator={() => {
            const screen = Dimensions.get('screen')
            return screen.width - 40
          }}
        />
        <DrawingInteractionPanel item={drawing} />
        <PresetButton
          style={styles.common.downloadButton}
          label={text.download}
          onPress={() => {}}
        />
      </ScrollView>
    </View>
  )
}

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
