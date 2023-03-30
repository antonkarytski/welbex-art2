import { useStore } from 'effector-react'
import React, { useEffect } from 'react'
import { ScrollView, StyleSheet } from 'react-native'
import { ArtWork } from '../../api/parts/arts/types'
import { downloadImageFromUrl } from '../../lib/files/download'
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
import { useAtrWorkActions } from './hooks'
import { downloadFullSizeDrawing, getArtWorkRequest } from './request'

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

  const { toggleLike, save, like, followAuthor } = useAtrWorkActions(
    drawing.data as ArtWork,
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
        onPressFollow={followAuthor}
        item={drawing.data.author}
      />
      <DoubleTouchOverlay onPress={like}>
        <AutoHeightImage
          image={{ uri: drawing.data.image_thumbnail }}
          widthGenerator={() => SCREEN_CONTENT_WIDTH}
        />
      </DoubleTouchOverlay>
      <ArtWorkInteractionPanel
        item={drawing.data}
        onPressLike={toggleLike}
        onPressSave={save}
      />
      <PresetButton
        style={styles.downloadButton}
        label={text.download}
        onPress={async () => {
          if (!drawing.data) return
          if (!myProfile?.subscription) {
            downloadImageFromUrl(drawing.data.image_thumbnail).catch(noop)
            return
          }
          downloadFullSizeDrawing(drawing.data.id).catch(noop)
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
