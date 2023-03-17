import { useStore } from 'effector-react'
import React, { useCallback } from 'react'
import { FlatList, StyleSheet, View, ViewProps } from 'react-native'
import { WinnerItem } from '../../api/parts/categories/types'
import { SCREEN_PADDING_HORIZONTAL } from '../../styles/constants'
import { useText } from '../../translations/hook'
import H2 from '../../ui/H2'
import Span from '../../ui/Span'
import Loader from '../../ui/loaders/Loader'
import WinnersListSkeleton from '../../ui/loaders/Skeleton.Winners'
import { createThemedStyle } from '../themed'
import { useThemedStyleList } from '../themed/hooks'
import { ageCategory, userName } from '../user/helpers'
import CardWinner from './Card.Winner'
import { winnersListModel } from './request'
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
  const winners = useStore(winnersListModel.$items)
  const isNextLoading = useStore(winnersListModel.$isNextLoading)
  const isLoading = useStore(winnersListModel.$isLoading)

  const getNext = () => {
    winnersListModel.getNext()
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
    [styles, text]
  )

  if (isLoading) return <WinnersListSkeleton />

  return (
    <View onLayout={onLayout} style={styles.common.container}>
      <H2 style={styles.common.title} label={text.winners} />
      <FlatList
        contentContainerStyle={styles.common.listContent}
        showsHorizontalScrollIndicator={false}
        horizontal
        data={winners}
        renderItem={renderWinnerItem}
        keyExtractor={keyExtractor}
        ListFooterComponent={isNextLoading ? <Loader /> : null}
        onEndReached={getNext}
        ListEmptyComponent={
          <Span label={text.noWinners} style={styles.common.noWinnersText} />
        }
      />
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
