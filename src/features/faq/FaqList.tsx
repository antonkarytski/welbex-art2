import { useStore } from 'effector-react'
import React, { useCallback } from 'react'
import { FlatList } from 'react-native'
import { FaqItem } from '../../api/parts/faq/types'
import ListItemSeparator from '../../ui/lists/ListItemSeparator'
import { createThemedStyle } from '../themed'
import { useTheme } from '../themed/hooks'
import FaqListItem from './FaqListItem'
import { $faqList } from './model'

const FaqList = () => {
  const data = useStore($faqList)
  const { styles: tabStyles, colors } = useTheme(themedTabStyles)

  const renderItem = useCallback(
    ({ item }: { item: FaqItem }) => (
      <FaqListItem item={item} styles={tabStyles} colors={colors} />
    ),
    [colors, tabStyles]
  )

  if (!data) return null

  return (
    <FlatList
      data={data.list}
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
