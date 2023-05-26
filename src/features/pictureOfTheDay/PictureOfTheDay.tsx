import { useRequest } from '@heyheyjude/toolkit'
import React, { useEffect } from 'react'
import {
  LayoutChangeEvent,
  StyleProp,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native'
import { api } from '../../api'
import { noop } from '../../lib/helpers'
import { useNavigate } from '../../navigation'
import { links } from '../../navigation/links'
import { useText } from '../../translations/hook'
import H2 from '../../ui/H2'
import ImageCard from '../../ui/cards/ImageCard'

type PictureOfTheDayProps = {
  onLayout?: (e: LayoutChangeEvent) => void
  titleStyle?: StyleProp<TextStyle>
  imageStyle?: StyleProp<ViewStyle>
}

const PictureOfTheDay = ({
  onLayout,
  titleStyle,
  imageStyle,
}: PictureOfTheDayProps) => {
  const artOfDay = useRequest(api.arts.artOfTheDay)
  const navigate = useNavigate()
  const text = useText()

  useEffect(() => {
    api.arts.artOfTheDay().catch(noop)
  }, [])

  if (!artOfDay.data) return null

  return (
    <View
      onLayout={onLayout}
      style={{ paddingHorizontal: 20, paddingBottom: 24 }}
    >
      <H2 style={titleStyle} label={text.pictureOfDay} />
      {artOfDay.data && (
        <ImageCard
          onPress={() => {
            if (!artOfDay.data) return
            navigate(links.artWorkDetails, { item: artOfDay.data })
          }}
          style={[
            {
              borderRadius: 20,
              borderWidth: 1,
            },
            imageStyle,
          ]}
          imageHeight={260}
          image={{ uri: artOfDay.data.image_thumbnail }}
        />
      )}
    </View>
  )
}

export default PictureOfTheDay
