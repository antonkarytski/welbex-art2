import { useStore } from 'effector-react'
import React, { useCallback } from 'react'
import { FlatList, StyleSheet, View, ViewProps } from 'react-native'
import { WinnerItem } from '../../api/parts/categories/types'
import { SCREEN_PADDING_HORIZONTAL } from '../../styles/constants'
import { useText } from '../../translations/hook'
import H2 from '../../ui/H2'
import Loader from '../../ui/Loader'
import Span from '../../ui/Span'
import { createThemedStyle } from '../themed'
import { useThemedStyleList } from '../themed/hooks'
import { ageCategory, userName } from '../user/helpers'
import CardWinner from './Card.Winner'
import { winnersRequest } from './request'
import { winnerCardThemedStyles } from './styles'

const keyExtractor = ({ art }: WinnerItem) => art.id.toString()

type WinnersBlockProps = {
  onLayout?: ViewProps['onLayout']
}

const WinnersBlock = ({ onLayout }: WinnersBlockProps) => {
  const { styles } = useThemedStyleList({
    common: themedStyles,
    card: winnerCardThemedStyles,
  })
  const text = useText()
  const winners = useStore(winnersRequest.$items)
  const nextPage = useStore(winnersRequest.$nextPage)
  const getNext = () => {
    winnersRequest.getNext()
  }

  const renderWinnerItem = useCallback(
    ({ item }: { item: WinnerItem }) => {
      return (
        <CardWinner
          category={item.category.name}
          authorName={userName(item.winner)}
          yearsCategory={ageCategory(item, text)}
          image={{ uri: item.art.image_thumbnail }}
          styles={styles.card}
          offsetY={100}
        />
      )
    },
    [styles]
  )

  return (
    <View onLayout={onLayout} style={styles.common.container}>
      <H2 style={styles.common.title} label={text.winners} />
      {winners.length ? (
        <FlatList
          contentContainerStyle={styles.common.listContent}
          showsHorizontalScrollIndicator={false}
          horizontal
          data={winners}
          renderItem={renderWinnerItem}
          keyExtractor={keyExtractor}
          ListFooterComponent={nextPage ? <Loader /> : null}
          onEndReached={getNext}
        />
      ) : (
        <Span label={text.noWinners} style={styles.common.noWinnersText} />
      )}
    </View>
  )
}

const themedStyles = createThemedStyle((colors) =>
  StyleSheet.create({
    container: {
      width: '100%',
      paddingBottom: 24,
    },
    listContent: {
      paddingRight: 20,
    },
    title: {
      color: colors.navigationLabelSelected,
      paddingLeft: 20,
    },
    noWinnersText: {
      height: 150,
      color: colors.text,
      fontSize: 18,
      paddingHorizontal: SCREEN_PADDING_HORIZONTAL,
    },
  })
)

export default WinnersBlock
