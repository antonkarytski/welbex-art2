import React from 'react'
import { ImageBackground, StyleSheet, View } from 'react-native'
import ScreenHeader from '../../navigation/elements/ScreenHeader'
import { ScreenHeaderStyles } from '../../navigation/elements/styles'
import { useText } from '../../translations/hook'
import H1 from '../../ui/H1'
import Span from '../../ui/Span'
import { createThemedStyle } from '../themed'
import { useThemedStyleList } from '../themed/hooks'
import { CompetitionCategory } from './types'

type CategoryDetailsHeaderProps = {
  item: CompetitionCategory
}

const CategoryDetailsHeader = ({ item }: CategoryDetailsHeaderProps) => {
  const text = useText()
  const { styles, colors } = useThemedStyleList({
    common: themedStyles,
    header: headerThemedStyles,
  })

  return (
    <ScreenHeader
      backArrowColor={colors.whiteText}
      backAvailable
      style={styles.header}
      title={text.category}
    />
  )

  // return (
  //   <ImageBackground source={item.image}>
  //     <ScreenHeader
  //       backArrowColor={colors.whiteText}
  //       backAvailable
  //       style={styles.header}
  //       title={text.category}
  //     />
  //     <View style={styles.common.content}>
  //       <H1 style={styles.common.title} label={item.label} />
  //       <Span style={styles.common.term} label={item.term} />
  //     </View>
  //   </ImageBackground>
  // )
}

const headerThemedStyles = createThemedStyle<ScreenHeaderStyles>((colors) =>
  StyleSheet.create({
    line: {
      backgroundColor: colors.line,
    },
  })
)

const themedStyles = createThemedStyle((colors) =>
  StyleSheet.create({
    content: {
      paddingHorizontal: 20,
    },
    title: {
      color: colors.whiteText,
      marginBottom: 12,
    },
    term: {
      color: colors.whiteText,
      marginBottom: 36,
    },
  })
)

export default CategoryDetailsHeader
