import React from 'react'
import { View } from 'react-native'
import Span from '../../ui/Span'
import ImageCard, { ImageCardProps } from '../../ui/cards/ImageCard'
import { WinnerCardStyles } from './styles'

type WinnerCardProps = ImageCardProps & {
  styles: WinnerCardStyles
  category: string
  yearsCategory: string
  authorName: string
}

const WinnerCard = React.memo(
  ({
    image,
    imageOptions,
    styles,
    yearsCategory,
    category,
    authorName,
  }: WinnerCardProps) => {
    return (
      <ImageCard
        image={image}
        imageOptions={imageOptions}
        style={styles.container}
      >
        <View style={styles.description}>
          <View style={styles.row}>
            <Span
              style={styles.categoryLabel}
              weight={600}
              label={`"${category}"`}
            />
            <Span
              style={styles.yearsLabel}
              weight={500}
              label={yearsCategory}
            />
          </View>
          <View style={styles.row}>
            <Span style={styles.name} label={authorName} />
          </View>
        </View>
      </ImageCard>
    )
  }
)

export default WinnerCard
