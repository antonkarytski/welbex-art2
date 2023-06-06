import React, { useCallback } from 'react'
import { FlatList, StyleSheet, View, ViewProps } from 'react-native'
import { WinnerItem } from '../../api/parts/categories/types'
import { useNavigate } from '../../navigation'
import { links } from '../../navigation/links'
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
import { useWinnersModel } from './hooks'
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

  const { winners, isLoading, isNextLoading, getNextSync } = useWinnersModel()
  const navigate = useNavigate()

  const onPressItem = useCallback(
    (item: WinnerItem) => {
      navigate(links.artWorkDetails, { item: item.art })
    },
    [navigate]
  )

  const renderWinnerItem = useCallback(
    ({ item }: { item: WinnerItem }) => {
      return (
        <CardWinner
          text={text}
          item={item}
          onPress={onPressItem}
          styles={styles.card}
          offsetY={100}
        />
      )
    },
    [styles, text, onPressItem]
  )

  if (isLoading) return <WinnersListSkeleton />

  return (
    <View onLayout={onLayout} style={styles.common.container}>
      <H2 style={styles.common.title} label={text.winners} />
      <FlatList
        bounces={false}
        contentContainerStyle={styles.common.listContent}
        showsHorizontalScrollIndicator={false}
        horizontal
        data={winners}
        renderItem={renderWinnerItem}
        keyExtractor={keyExtractor}
        ListFooterComponent={
          isNextLoading ? (
            <Loader style={{ container: styles.common.loader }} />
          ) : null
        }
        onEndReached={getNextSync}
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
    },
    listContent: {
      paddingRight: 20,
      paddingBottom: 8,
    },
    title: {
      color: colors.text,
      paddingLeft: 20,
    },
    noWinnersText: {
      height: 150,
      color: colors.text,
      fontSize: 18,
      paddingHorizontal: SCREEN_PADDING_HORIZONTAL,
    },
    loader: {
      marginLeft: 10,
    },
  })
)

export default WinnersBlock
