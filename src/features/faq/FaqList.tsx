import React, { useCallback } from 'react'
import { FlatList } from 'react-native'
import { FaqItem, MOCK_FAQ } from '../../_mock/faq'
import ListItemSeparator from '../../ui/ListItemSeparator'
import FaqListItem from './FaqListItem'

const FaqList = () => {
  const renderItem = useCallback(
    ({ item }: { item: FaqItem }) => <FaqListItem item={item} />,
    []
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

export default FaqList
