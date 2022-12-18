import React from 'react'
import { ImageSourcePropType, View } from 'react-native'
import Span from '../../ui/Span'
import ImageCard from '../../ui/cards/ImageCard'
import { CategoryCardStyles } from './styles'

type CardCategoryProps = {
  styles: CategoryCardStyles
  image: ImageSourcePropType
  label: string
}

const CardCategory = React.memo(
  ({ styles, image, label }: CardCategoryProps) => {
    return (
      <ImageCard style={styles.container} image={image} imageHeight={180}>
        <View style={styles.captionContainer}>
          <Span weight={600} style={styles.label} label={label} />
        </View>
      </ImageCard>
    )
  }
)

export default CardCategory
