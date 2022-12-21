import { Dimensions, StyleSheet, ViewStyle } from 'react-native'
import { themedShadow5Style } from '../../styles/shadows'
import { createThemedStyle } from '../themed'
import { UserDescriptionStyles } from '../user/styles'

export type GalleryItemStyles = UserDescriptionStyles & {
  container: ViewStyle
  card: ViewStyle
  likeButton: ViewStyle
  shareButton: ViewStyle
  descriptionContainer: ViewStyle
}

export const galleryItemThemedStyles = createThemedStyle<GalleryItemStyles>(
  (colors) =>
    StyleSheet.create({
      container: {
        ...themedShadow5Style(colors),
        width: Dimensions.get('screen').width - 40,
        marginBottom: 20,
      },
      card: {
        backgroundColor: colors.card,
        borderBottomRightRadius: 20,
        borderBottomLeftRadius: 20,
        flexDirection: 'row',
        alignItems: 'center',
      },
      likeButton: {
        marginLeft: 'auto',
        paddingVertical: 12,
        paddingLeft: 20,
        paddingRight: 6,
      },
      shareButton: {
        paddingHorizontal: 20,
        paddingVertical: 12,
      },
      descriptionContainer: {
        paddingLeft: 20,
        paddingVertical: 12,
      },
      subText: {
        color: colors.subText,
      },
      name: {
        color: colors.text,
      },
    })
)
