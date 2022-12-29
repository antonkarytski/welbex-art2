import React, { useCallback } from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import { WINNERS_MOCK } from '../../_mock/winners'
import AppHeader from '../../navigation/elements/AppHeader'
import { useText } from '../../translations/hook'
import H2 from '../../ui/H2'
import { createThemedStyle } from '../themed'
import { useThemedStyleList } from '../themed/hooks'
import CardWinner from './Card.Winner'
import { winnerCardThemedStyles } from './styles'
import { IWinner } from './types'

const keyExtractor = ({ id }: IWinner) => id

const WinnersBlock = () => {
  const { styles } = useThemedStyleList({
    common: themedStyles,
    card: winnerCardThemedStyles,
    header: headerStyles,
  })
  const text = useText()

  const renderWinnerItem = useCallback(
    ({ item }: { item: IWinner }) => {
      return (
        <CardWinner
          category={item.category}
          authorName={item.author.name}
          yearsCategory={item.yearsCategory}
          image={item.image}
          styles={styles.card}
          offsetY={100}
        />
      )
    },
    [styles]
  )

  return (
    <View style={styles.common.container}>
      <AppHeader style={styles.header} />
      <H2 style={styles.common.title} label={text.winners} />
      <FlatList
        contentContainerStyle={styles.common.listContent}
        showsHorizontalScrollIndicator={false}
        horizontal
        data={WINNERS_MOCK}
        renderItem={renderWinnerItem}
        keyExtractor={keyExtractor}
      />
    </View>
  )
}

const headerStyles = createThemedStyle((colors) =>
  StyleSheet.create({
    title: {
      color: '#FFF',
    },
  })
)

const themedStyles = createThemedStyle((colors) =>
  StyleSheet.create({
    firstCard: {
      marginLeft: 0,
    },
    container: {
      backgroundColor: colors.primary1,
      width: '100%',
      paddingBottom: 24,
      marginBottom: 8,
      height: 445,
    },
    contentContainer: {},
    listContent: {
      paddingRight: 20,
    },
    title: {
      color: colors.navigationLabelSelected,
      paddingLeft: 20,
    },
  })
)

export default WinnersBlock
