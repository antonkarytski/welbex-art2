import { createEvent, sample } from 'effector'
import { useStore } from 'effector-react'
import React, { useEffect } from 'react'
import { ScrollView, StyleSheet } from 'react-native'
import fs from 'react-native-fs'
import { MyProfile } from '../../api/parts/users/types'
import { noop } from '../../lib/helpers'
import { useRequest } from '../../lib/models/apiBuilder/hooks'
import { useNavigate } from '../../navigation'
import { links } from '../../navigation/links'
import { SCREEN_CONTENT_WIDTH } from '../../styles/constants'
import { useText } from '../../translations/hook'
import DoubleTouchOverlay from '../../ui/DoubleTouchOverlay'
import PresetButton from '../../ui/buttons/PresetButton'
import Loader from '../../ui/loaders/Loader'
import AutoHeightImage from '../images/AutoHeightImage'
import { $myProfile } from '../profile/model'
import UserCardPreview from '../user/UserCardPreview'
import ArtWorkInteractionPanel from './ArtWorkInteractivePanel'
import { useArtWorkActions } from './hooks'
import { getArtWorkRequest } from './request'

type ArtWorkDetailsProps = {
  drawingId: number
}

const ArtWorkDetails = React.memo(({ drawingId }: ArtWorkDetailsProps) => {
  const navigate = useNavigate()
  const text = useText()
  const drawing = useRequest(getArtWorkRequest)
  const myProfile = useStore($myProfile)

  useEffect(() => {
    getArtWorkRequest(drawingId).catch(noop)
  }, [drawingId])

  const { onToggleLike, onSave, onLike, onFollowAuthor } = useArtWorkActions(
    drawing.data,
    drawing.update
  )

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
        onFollowPress={onFollowAuthor}
        item={drawing.data.author}
      />
      <DoubleTouchOverlay onPress={onLike}>
        <AutoHeightImage
          image={{ uri: drawing.data.image_thumbnail }}
          widthGenerator={() => SCREEN_CONTENT_WIDTH}
        />
      </DoubleTouchOverlay>

      <ArtWorkInteractionPanel
        item={drawing.data}
        onLikeArt={onToggleLike}
        onSaveArt={onSave}
      />
      <PresetButton
        style={styles.downloadButton}
        label={text.download}
        onPress={() => {
          if (!drawing.data) return
          fs.downloadFile({
            fromUrl: drawing.data.image_thumbnail,
            toFile: `${fs.DocumentDirectoryPath}/ddd.jpg`,
          })
            .promise.then((r) => {})
            .catch((e) => {})
        }}
      />
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

const clock = createEvent<number>()
sample({
  source: $myProfile,
  clock,
  filter: (profile): profile is MyProfile => !!profile,
}).watch((d) => {})
