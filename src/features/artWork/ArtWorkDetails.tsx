import { useStore } from 'effector-react'
import React from 'react'
import { ScrollView, StyleSheet, TouchableOpacity } from 'react-native'
import { ArtWork } from '../../api/parts/arts/types'
import { useRequest } from '../../lib/models/apiBuilder/hooks'
import { useNavigate } from '../../navigation'
import { links } from '../../navigation/links'
import { SCREEN_CONTENT_WIDTH } from '../../styles/constants'
import { useText } from '../../translations/hook'
import { useDoubleTap } from '../../ui/doubleTouch/hooks'
import Loader from '../../ui/loaders/Loader'
import AutoHeightImage from '../images/AutoHeightImage'
import { $myProfile } from '../profile/model'
import UserCardPreview from '../user/UserCardPreview'
import ArtWorkInteractionPanel from './ArtWorkInteractivePanel'
import DownloadImageButton from './DownloadImageButton'
import { useAtrWorkActions } from './hooks'
import { getArtWorkRequest } from './request'

const ArtWorkDetails = React.memo(() => {
  const navigate = useNavigate()
  const text = useText()
  const drawing = useRequest(getArtWorkRequest)
  const myProfile = useStore($myProfile)

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
      <TouchableOpacity activeOpacity={1} onPress={pressHandler}>
        <AutoHeightImage
          image={{ uri: drawing.data.image_thumbnail }}
          widthGenerator={() => SCREEN_CONTENT_WIDTH}
        />
      </TouchableOpacity>
      <ArtWorkInteractionPanel
        item={drawing.data}
        onPressLike={actions.toggleLike}
        onPressSave={actions.save}
      />
      <DownloadImageButton
        style={styles.downloadButton}
        label={text.download}
        artWork={artWork}
      />
      {/*{!!myProfile?.subscription && (*/}
      {/*  <DownloadImageButton*/}
      {/*    style={styles.downloadButton}*/}
      {/*    label={text.download}*/}
      {/*    artWork={artWork}*/}
      {/*  />*/}
      {/*)}*/}
    </ScrollView>
  )
})

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
  downloadButton: {
    marginTop: 37,
    marginBottom: 24,
  },
})

export default ArtWorkDetails
