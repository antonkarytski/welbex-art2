import { useRequest } from '@heyheyjude/toolkit'
import { useStore } from 'effector-react'
import React from 'react'
import { ScrollView, StyleSheet, TouchableOpacity } from 'react-native'
import { ArtWork, ArtWorkStatus } from '../../api/parts/arts/types'
import { useNavigate } from '../../navigation'
import { links } from '../../navigation/links'
import { SCREEN_CONTENT_WIDTH } from '../../styles/constants'
import Span from '../../ui/Span'
import { useDoubleTap } from '../../ui/doubleTouch/hooks'
import Loader from '../../ui/loaders/Loader'
import AutoHeightImage from '../images/AutoHeightImage'
import { $myProfile } from '../profile/model'
import { createThemedStyle } from '../themed'
import { useThemedStyle } from '../themed/hooks'
import UserCardPreview from '../user/UserCardPreview'
import ArtWorkInteractionPanel from './ArtWorkInteractivePanel'
import { useAtrWorkActions } from './hooks'
import { getArtWorkRequest } from './request'

const ArtWorkDetails = React.memo(() => {
  const navigate = useNavigate()
  const drawing = useRequest(getArtWorkRequest)
  const myProfile = useStore($myProfile)
  const styles = useThemedStyle(themedStyles)

  const artWork = drawing.data as ArtWork
  const actions = useAtrWorkActions(artWork, drawing.update)
  const pressHandler = useDoubleTap({
    onDoublePress: actions.like,
  })

  if (!drawing.data && drawing.isLoading) {
    return <Loader />
  }

  if (!drawing.data) return null

  return (
    <ScrollView bounces={false} style={styles.container}>
      <UserCardPreview
        onPress={(item) => {
          if (item.id === myProfile?.id) {
            return navigate(links.profileTab)
          }
          navigate(links.userProfile, { item })
        }}
        onPressFollow={actions.followAuthor}
        item={drawing.data.author}
      />
      <TouchableOpacity
        style={styles.imageContainer}
        activeOpacity={1}
        onPress={pressHandler}
      >
        <AutoHeightImage
          image={{ uri: drawing.data.image_thumbnail }}
          widthGenerator={() => SCREEN_CONTENT_WIDTH}
        />
      </TouchableOpacity>
      {artWork.status_id === ArtWorkStatus.PUBLISHED && (
        <ArtWorkInteractionPanel
          item={artWork}
          onPressLike={actions.toggleLike}
          onPressSave={actions.save}
        />
      )}
      <Span style={styles.title} weight={600} label={artWork.title} />

      {/*{myProfile?.subscription ? (*/}
      {/*  <DownloadImageButton*/}
      {/*    style={styles.downloadButton}*/}
      {/*    label={text.download}*/}
      {/*    artWork={artWork}*/}
      {/*  />*/}
      {/*) : (*/}
      {/*  <View style={styles.plug} />*/}
      {/*)}*/}
    </ScrollView>
  )
})

const themedStyles = createThemedStyle((colors) =>
  StyleSheet.create({
    container: {
      paddingHorizontal: 20,
    },
    downloadButton: {
      marginTop: 37,
      marginBottom: 24,
    },
    plug: {
      height: 37,
    },
    imageContainer: {
      marginBottom: 12,
    },
    title: {
      color: colors.text,
      fontSize: 16,
      marginBottom: 37, // <- remove this if getting back download button
    },
  })
)

export default ArtWorkDetails
