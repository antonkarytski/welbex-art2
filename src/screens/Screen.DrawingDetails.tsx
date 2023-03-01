import React, { useEffect } from 'react'
import { Dimensions, ScrollView, StyleSheet, View } from 'react-native'
import DrawingInteractionPanel from '../features/drawing/DrawingInteractivePanel'
import { getArtWorkRequest } from '../features/drawing/request'
import AutoHeightImage from '../features/images/AutoHeightImage'
import { createThemedStyle } from '../features/themed'
import { useThemedStyleList } from '../features/themed/hooks'
import UserCardPreview from '../features/user/UserCardPreview'
import { noop } from '../lib/helpers'
import { useRequest } from '../lib/models/apiBuilder/hooks'
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
  const drawing = useRequest(getArtWorkRequest)

  const { styles, colors } = useThemedStyleList({
    common: themedStyles,
    header: transparentThemedHeaderStyles,
  })

  useEffect(() => {
    getArtWorkRequest(drawingId).catch(noop)
  }, [drawingId])

  return (
    <View style={styles.common.container}>
      <AppHeader
        style={styles.header}
        backAvailable
        settingsAvailable
        iconsColor={colors.appHeaderIconDark}
      />
      {drawing.data && (
        <ScrollView bounces={false} style={styles.common.contentContainer}>
          <UserCardPreview
            onAvatarPress={(item) => {
              navigate(links.userProfile, { item })
            }}
            onSubscribePress={() => {
              navigate(links.subscriptionCurrent)
            }}
            item={drawing.data.author}
          />
          <AutoHeightImage
            image={{ uri: drawing.data.image_thumbnail }}
            widthGenerator={() => {
              const screen = Dimensions.get('screen')
              return screen.width - 40
            }}
          />
          <DrawingInteractionPanel
            onLikeChange={(isLiked) =>
              drawing.set((current) => {
                if (!current) return null
                return {
                  ...current,
                  is_liked: isLiked,
                  likes: isLiked ? current.likes + 1 : current.likes - 1,
                }
              })
            }
            item={drawing.data}
          />
          <PresetButton
            style={styles.common.downloadButton}
            label={text.download}
            onPress={() => {}}
          />
        </ScrollView>
      )}
      {!drawing.data && drawing.isLoading && <Loader />}
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
