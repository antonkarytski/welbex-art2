import React from 'react'
import { StyleProp, TouchableOpacity, ViewStyle } from 'react-native'
// import Share from 'react-native-share'
import ShareIcon from '../icons/Icon.Share'

type ShareButtonProps = {
  style?: StyleProp<ViewStyle>
  color?: string
  item: {
    url: string
    title?: string
  }
}

const ShareButton = ({ style, color, item }: ShareButtonProps) => {
  return (
    <TouchableOpacity
      style={style}
      onPress={() => {
        // Share.open({
        //   url: item.url,
        //   title: item.title,
        // })
      }}
    >
      <ShareIcon color={color} />
    </TouchableOpacity>
  )
}

export default ShareButton
