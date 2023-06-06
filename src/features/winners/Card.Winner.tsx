import React from 'react'
import { View } from 'react-native'
import { WinnerItem } from '../../api/parts/categories/types'
import { truncateString } from '../../lib/helpers/strings'
import { LangStructure } from '../../translations/types'
import Row from '../../ui/Row'
import Span from '../../ui/Span'
import ImageCard from '../../ui/cards/ImageCard'
import WinnerIcon, { winnersIconStyles } from '../../ui/icons/Icon.Winner'
import { CountryCode } from '../countries'
import { getCountry } from '../user'
import { ageCategory, userName } from '../user/helpers'
import { WinnerCardStyles } from './styles'

type WinnerCardProps = {
  styles: WinnerCardStyles
  offsetY?: number
  onPress?: (item: WinnerItem) => void
  item: WinnerItem
  text: LangStructure
}

const CardWinner = React.memo(
  ({ styles, offsetY, onPress, item, text }: WinnerCardProps) => {
    const country = getCountry(item.winner.country as CountryCode)

    return (
      <ImageCard
        onPress={() => onPress?.(item)}
        style={styles.container}
        imageHeight={150}
        imageOffsetY={offsetY}
        image={{ uri: item.art.image_thumbnail }}
      >
        <WinnerIcon style={winnersIconStyles.container} />
        <View style={styles.description}>
          <Row style={styles.row}>
            <Span
              style={styles.categoryLabel}
              weight={600}
              label={`${truncateString(item.category.name, 16)}`}
            />
            <Span
              style={styles.yearsLabel}
              weight={500}
              label={ageCategory(item, text)}
            />
          </Row>
          <View style={styles.row}>
            <Span
              style={styles.name}
              label={`${userName(item.winner)} ${country ? country.emoji : ''}`}
            />
          </View>
        </View>
      </ImageCard>
    )
  }
)

export default CardWinner
