import React from 'react'
import { View } from 'react-native'
import {
  CategoryResponse,
  CategoryType,
} from '../../api/parts/categories/types'
import { useNavigate } from '../../navigation'
import { links } from '../../navigation/links'
import Span from '../../ui/Span'
import ImageCard from '../../ui/cards/ImageCard'
import CrownIcon from '../../ui/icons/Icon.Crown'
import { CategoryCardStyles } from './styles'

type CardCategoryProps = {
  styles: CategoryCardStyles
  item: CategoryResponse
  showPremium?: boolean
}

const CardCategory = React.memo(
  ({ styles, item, showPremium }: CardCategoryProps) => {
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
        <View style={[styles.captionContainer, { flexDirection: 'row' }]}>
          <Span
            weight={600}
            style={[styles.label, { marginRight: 12 }]}
            label={item.name}
          />
          {showPremium && item.type_id === CategoryType.PREMIUM && (
            <CrownIcon />
          )}
        </View>
      </ImageCard>
    )
  }
)

export default CardCategory
