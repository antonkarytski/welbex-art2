import { useStoreMap } from 'effector-react'
import React from 'react'
import { StyleSheet } from 'react-native'
import {
  CategoryType,
  SpecificCategoryResponse,
} from '../../../api/parts/categories/types'
import { useNavigate } from '../../../navigation'
import { links } from '../../../navigation/links'
import { buttonPrimaryThemedPreset } from '../../../styles/buttons'
import { useText } from '../../../translations/hook'
import Span from '../../../ui/Span'
import PresetButton from '../../../ui/buttons/PresetButton'
import { selectedCategoryModel } from '../../createPost/model.categorySelect'
import { $myProfile } from '../../profile/model'
import { $availableCategories } from '../../profile/model.availableCategories'
import { createThemedStyle } from '../../themed'
import { useThemedStyleList } from '../../themed/hooks'

type CategoryDescriptionProps = {
  item: SpecificCategoryResponse
}

const JoinCategoryButton = ({ item }: CategoryDescriptionProps) => {
  const text = useText()
  const isHiddenAsPaid = useStoreMap({
    store: $myProfile,
    keys: [item.type_id],
    fn: (profile) =>
      !!profile &&
      !profile.subscription &&
      item.type_id === CategoryType.PREMIUM,
  })
  const isAvailable = useStoreMap({
    store: $availableCategories,
    keys: [item.id],
    fn: (availableCategories) =>
      !!availableCategories &&
      (availableCategories.current_month.includes(item.id) ||
        availableCategories.next_month.includes(item.id)),
  })
  const navigate = useNavigate()
  const { styles } = useThemedStyleList({
    button: buttonPrimaryThemedPreset,
    text: textThemedStyles,
  })

  const onJoinCategory = () => {
    navigate(links.createPostTab)
    selectedCategoryModel.set(item)
  }

  if (isHiddenAsPaid) {
    return (
      <Span
        weight={500}
        style={styles.text.unavailable}
        label={text.subscriptionRequired}
      />
    )
  }
  return (
    <PresetButton
      disabled={!isAvailable}
      label={text.join}
      onPress={onJoinCategory}
      preset={styles.button}
    />
  )
}

const textThemedStyles = createThemedStyle((colors) =>
  StyleSheet.create({
    text: {
      color: colors.text,
      lineHeight: 21.28,
    },
    unavailable: {
      color: colors.primary1,
      fontSize: 16,
    },
  })
)

export default JoinCategoryButton
