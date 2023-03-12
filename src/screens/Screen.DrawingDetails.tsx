import { useStore } from 'effector-react'
import React, { useEffect } from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import { api } from '../api'
import { $isAuth } from '../features/auth/model'
import DrawingInteractionPanel from '../features/drawing/DrawingInteractivePanel'
import AutoHeightImage from '../features/images/AutoHeightImage'
import { $myProfile } from '../features/profile/model'
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
import { SCREEN_CONTENT_WIDTH } from '../styles/constants'
import { themedShadow5Style } from '../styles/shadows'
import { useText } from '../translations/hook'
import PresetButton from '../ui/buttons/PresetButton'
import Loader from '../ui/loaders/Loader'

const DrawingDetailsScreen = ({
  route,
}: ScreenComponentProps<
  links.drawingDetails | links.galleryDrawingDetails
>) => {
  const navigate = useNavigate()
  const text = useText()
  const isAuth = useStore($isAuth)
  const drawingId = route.params.item.id
  const drawing = useRequest(
    isAuth ? api.arts.specificProtected : api.arts.specific
  )
  const myProfile = useStore($myProfile)

  const { styles, colors } = useThemedStyleList({
    common: themedStyles,
    header: transparentThemedHeaderStyles,
  })

  useEffect(() => {
    isAuth
      ? api.arts.specificProtected(drawingId).catch(noop)
      : api.arts.specific(drawingId).catch(noop)
  }, [drawingId, isAuth])

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
              if (item.id === myProfile?.id) {
                return navigate(links.profileTab)
              }
              navigate(links.userProfile, { item })
            }}
            onSubscribePress={() => {
              navigate(links.subscriptionCurrent)
            }}
            item={drawing.data.author}
          />
          <AutoHeightImage
            image={{ uri: drawing.data.image_thumbnail }}
            widthGenerator={() => SCREEN_CONTENT_WIDTH}
          />
          <DrawingInteractionPanel
            onLikeChange={(isLiked, likes) =>
              drawing.update({ is_liked: isLiked, likes })
            }
            onSaveChange={(isSaved) => drawing.update({ is_saved: isSaved })}
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
