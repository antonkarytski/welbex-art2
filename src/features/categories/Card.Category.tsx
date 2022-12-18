import React from 'react'
import { ImageSourcePropType, View } from 'react-native'
import { useNavigate } from '../../navigation'
import { links } from '../../navigation/links'
import Span from '../../ui/Span'
import ImageCard from '../../ui/cards/ImageCard'
import { CategoryCardStyles } from './styles'
import { CompetitionCategory } from './types'

type CardCategoryProps = {
  styles: CategoryCardStyles
  item: CompetitionCategory
}

const CardCategory = React.memo(({ styles, item }: CardCategoryProps) => {
  const navigate = useNavigate()

  return (
    <ImageCard
      onPress={() => {
        navigate(links.categoryDetails, { item })
      }}
      style={styles.container}
      image={item.image}
      imageHeight={180}
    >
      <View style={styles.captionContainer}>
        <Span weight={600} style={styles.label} label={item.label} />
      </View>
    </ImageCard>
  )
})

export default CardCategory
