import React from 'react'
import { View } from 'react-native'
import { truncateString } from '../../lib/helpers/strings'
import Row from '../../ui/Row'
import Span from '../../ui/Span'
import ImageCard from '../../ui/cards/ImageCard'
import WinnerIcon, { winnersIconStyles } from '../../ui/icons/Icon.Winner'
import { WinnerCardStyles } from './styles'

type WinnerCardProps = {
  image: string
  styles: WinnerCardStyles
  category: string
  yearsCategory: string
  authorName: string
  offsetY?: number
  onPress?: () => void
}

const CardWinner = React.memo(
  ({
    styles,
    yearsCategory,
    category,
    authorName,
    offsetY,
    image,
    onPress,
  }: WinnerCardProps) => {
    return (
      <ImageCard
        onPress={onPress}
        style={styles.container}
        imageHeight={150}
        imageOffsetY={offsetY}
        image={{ uri: image }}
      >
        <WinnerIcon style={winnersIconStyles.container} />
        <View style={styles.description}>
          <Row style={styles.row}>
            <Span
              style={styles.categoryLabel}
              weight={600}
              label={`${truncateString(category, 16)}`}
            />
            <Span
              style={styles.yearsLabel}
              weight={500}
              label={yearsCategory}
            />
          </Row>
          <View style={styles.row}>
            <Span style={styles.name} label={authorName} />
          </View>
        </View>
      </ImageCard>
    )
  }
)

export default CardWinner
