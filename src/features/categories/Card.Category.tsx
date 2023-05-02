import React from 'react'
import { View } from 'react-native'
import { CategoryResponse } from '../../api/parts/categories/types'
import { useNavigate } from '../../navigation'
import { links } from '../../navigation/links'
import Span from '../../ui/Span'
import ImageCard from '../../ui/cards/ImageCard'
import { CategoryCardStyles } from './styles'

type CardCategoryProps = {
  styles: CategoryCardStyles
  item: CategoryResponse
}

const CardCategory = React.memo(({ styles, item }: CardCategoryProps) => {
  const navigate = useNavigate()
  return (
    <ImageCard
      cached
      onPress={() => {
        navigate(links.categoryDetails, { item })
      }}
      style={styles.container}
      image={item.image ? { uri: item.image } : null}
      imageHeight={180}
    >
      <View style={styles.captionContainer}>
        <Span weight={600} style={styles.label} label={item.name} />
      </View>
    </ImageCard>
  )
})

export default CardCategory
