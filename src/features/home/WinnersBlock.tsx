import React, { useCallback } from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import { WINNERS_MOCK } from '../../_mock/winners'
import ScreenHeader from '../../navigation/elements/ScreenHeader'
import { useText } from '../../translations/hook'
import H2 from '../../ui/H2'
import { createThemedStyle } from '../themed'
import { useThemedStyleList } from '../themed/hooks'
import WinnerCard from './WinnerCard'
import { winnerCardThemedStyles } from './styles'
import { IWinner } from './types'

type WinnersBlockProps = {}

const demoImageOptions = { height: 150, offsetY: 100 }
const keyExtractor = ({ id }: IWinner) => id

const WinnersBlock = ({}: WinnersBlockProps) => {
  const { styles } = useThemedStyleList({
    common: themedStyles,
    card: winnerCardThemedStyles,
  })
  const text = useText()

  const renderWinnerItem = useCallback(
    ({ item, index }: { item: IWinner; index: number }) => {
      return (
        <WinnerCard
          category={item.category}
          authorName={item.authorName}
          yearsCategory={item.yearsCategory}
          image={item.image}
          imageOptions={demoImageOptions}
          styles={styles.card}
        />
      )
    },
    [styles]
  )

  return (
    <View style={styles.common.container}>
      <ScreenHeader title={'ART2'} />
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
    firstCard: {
      marginLeft: 0,
    },
    container: {
      backgroundColor: colors.primary1,
      width: '100%',
      paddingBottom: 24,
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
