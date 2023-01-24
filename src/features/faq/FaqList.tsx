import React, { useCallback } from 'react'
import { FlatList } from 'react-native'
import { FaqItem, MOCK_FAQ } from '../../_mock/faq'
import ListItemSeparator from '../../ui/ListItemSeparator'
import { createThemedStyle } from '../themed'
import { useTheme } from '../themed/hooks'
import FaqListItem from './FaqListItem'

const FaqList = () => {
  const { styles: tabStyles, colors } = useTheme(themedTabStyles)

  const renderItem = useCallback(
    ({ item }: { item: FaqItem }) => (
      <FaqListItem item={item} styles={tabStyles} colors={colors} />
    ),
    [colors, tabStyles]
  )

  return (
    <FlatList
      data={MOCK_FAQ}
      renderItem={renderItem}
      ItemSeparatorComponent={ListItemSeparator}
      ListFooterComponent={ListItemSeparator}
    />
  )
}

const themedTabStyles = createThemedStyle((colors) => ({
  label: {
    color: colors.text,
  },
  label__opened: {
    color: colors.textAccent,
  },
  contentText: {
    color: colors.textGrey,
  },
}))

export default FaqList
