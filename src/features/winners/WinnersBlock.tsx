import { useStore } from 'effector-react'
import React, { useCallback, useEffect } from 'react'
import { FlatList, StyleSheet, View, ViewProps } from 'react-native'
import { WINNERS_MOCK } from '../../_mock/winners'
import { useText } from '../../translations/hook'
import H2 from '../../ui/H2'
import Loader from '../../ui/Loader'
import { createThemedStyle } from '../themed'
import { useThemedStyleList } from '../themed/hooks'
import CardWinner from './Card.Winner'
import { $isLoading, $nextPage, getWinners } from './request'
import { winnerCardThemedStyles } from './styles'
import { IWinner } from './types'

const keyExtractor = ({ id }: IWinner) => id

type WinnersBlockProps = {
  onLayout?: ViewProps['onLayout']
}

const WinnersBlock = ({ onLayout }: WinnersBlockProps) => {
  const { styles } = useThemedStyleList({
    common: themedStyles,
    card: winnerCardThemedStyles,
  })
  const text = useText()
  const nexPage = useStore($nextPage)
  const isLoading = useStore($isLoading)

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
    <View onLayout={onLayout} style={styles.common.container}>
      <H2 style={styles.common.title} label={text.winners} />
      {isLoading ? (
        <Loader />
      ) : (
        <FlatList
          contentContainerStyle={styles.common.listContent}
          showsHorizontalScrollIndicator={false}
          horizontal
          data={WINNERS_MOCK}
          renderItem={renderWinnerItem}
          keyExtractor={keyExtractor}
          ListFooterComponent={nexPage ? <Loader /> : null}
          onEndReached={() => getWinners()}
        />
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
  })
)

export default WinnersBlock
