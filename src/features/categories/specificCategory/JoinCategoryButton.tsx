import React from 'react'
import { StyleSheet } from 'react-native'
import { SpecificCategoryResponse } from '../../../api/parts/categories/types'
import { useNavigate } from '../../../navigation'
import { links } from '../../../navigation/links'
import {
  buttonPrimaryThemedPreset,
  buttonTextThemedStyles,
} from '../../../styles/buttons'
import { useText } from '../../../translations/hook'
import PresetButton from '../../../ui/buttons/PresetButton'
import { selectedCategoryModel } from '../../createPost/model.categorySelect'
import { createThemedStyle } from '../../themed'
import { useThemedStyleList } from '../../themed/hooks'

type CategoryDescriptionProps = {
  item: SpecificCategoryResponse
}

const JoinCategoryButton = ({ item }: CategoryDescriptionProps) => {
  const text = useText()
  const navigate = useNavigate()
  const { styles } = useThemedStyleList({
    button: buttonPrimaryThemedPreset,
    text: textThemedStyles,
    textButton: buttonTextThemedStyles,
  })

  const onJoinCategory = () => {
    navigate(links.createPostTab)
    selectedCategoryModel.set(item)
  }

  return (
    <PresetButton
      label={text.join}
      onPress={onJoinCategory}
      preset={styles.button}
      style={commonStyles.button}
    />
  )
}

const commonStyles = StyleSheet.create({
  button: {
    marginTop: 24,
  },
})

const textThemedStyles = createThemedStyle((colors) =>
  StyleSheet.create({
    text: {
      color: colors.text,
      lineHeight: 21.28,
    },
    container: {
      marginBottom: 20,
    },
  })
)

export default JoinCategoryButton
