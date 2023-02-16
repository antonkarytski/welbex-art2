import React, { useCallback } from 'react'
import { FlatList, StyleSheet, View, ViewProps } from 'react-native'
import { WINNERS_MOCK } from '../../_mock/winners'
import { useText } from '../../translations/hook'
import H2 from '../../ui/H2'
import { createThemedStyle } from '../themed'
import { useThemedStyleList } from '../themed/hooks'
import { userName } from '../user/helpers'
import CardWinner from './Card.Winner'
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

  const renderWinnerItem = useCallback(
    ({ item }: { item: IWinner }) => {
      return (
        <CardWinner
          category={item.category}
          authorName={userName(item.author)}
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
