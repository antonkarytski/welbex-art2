import React from 'react'
import { StyleSheet, View } from 'react-native'
import { SpecificCategoryResponse } from '../../../api/parts/categories/types'
import { useNavigate } from '../../../navigation'
import { links } from '../../../navigation/links'
import {
  buttonPrimaryThemedPreset,
  buttonTextThemedStyles,
} from '../../../styles/buttons'
import { useText } from '../../../translations/hook'
import H3 from '../../../ui/H3'
import TruncatedText from '../../../ui/TruncatedText'
import PresetButton from '../../../ui/buttons/PresetButton'
import { createThemedStyle } from '../../themed'
import { useThemedStyleList } from '../../themed/hooks'

type CategoryDescriptionProps = {
  item: SpecificCategoryResponse
}

const CategoryDescription = ({ item }: CategoryDescriptionProps) => {
  const text = useText()
  const navigate = useNavigate()
  const { styles } = useThemedStyleList({
    common: themedStyles,
    button: buttonPrimaryThemedPreset,
    text: textThemedStyles,
    textButton: buttonTextThemedStyles,
  })

  const onJoinCategory = () => {
    navigate(links.createPostTab)
  }

  return (
    <View style={styles.common.container}>
      {/* <H3 style={styles.common.header} label={text.description} />
      <TruncatedText
        text={item.description}
        showMoreLabel={text.showMore}
        showLessLabel={text.showLess}
        numberOfLines={6}
        style={{
          ...styles.text,
          button: styles.textButton,
        }}
      /> */}
      <PresetButton
        label={text.join}
        onPress={onJoinCategory}
        preset={styles.button}
      />
    </View>
  )
}

const themedStyles = createThemedStyle((colors) =>
  StyleSheet.create({
    container: {
      marginBottom: 8,
      marginTop: 24,
    },
    header: {
      marginTop: 0,
      color: colors.text,
    },
  })
)

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

export default CategoryDescription
