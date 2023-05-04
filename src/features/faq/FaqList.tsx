import { useStore } from 'effector-react'
import React, { useCallback, useRef } from 'react'
import { FlatList, StyleSheet } from 'react-native'
import { FaqItem } from '../../api/parts/faq/types'
import { OnOpenProps } from '../../ui/AccordionTab'
import ListItemSeparator from '../../ui/lists/ListItemSeparator'
import { createThemedStyle } from '../themed'
import { useTheme } from '../themed/hooks'
import FaqListItem from './FaqListItem'
import { $faqList } from './model'

const FaqList = () => {
  const data = useStore($faqList)
  const closeOpened = useRef<null | (() => void)>(null)
  const { styles: tabStyles, colors } = useTheme(themedTabStyles)

  const onItemOpen = useCallback(({ close }: OnOpenProps) => {
    if (close !== closeOpened.current) closeOpened.current?.()
    closeOpened.current = close
  }, [])

  const renderItem = useCallback(
    ({ item }: { item: FaqItem }) => (
      <FaqListItem
        item={item}
        styles={tabStyles}
        colors={colors}
        onOpen={onItemOpen}
      />
    ),
    [colors, tabStyles, onItemOpen]
  )

  if (!data) return null

  return (
    <FlatList
      data={data.list}
      contentContainerStyle={commonStyles.contentContainer}
      renderItem={renderItem}
      ItemSeparatorComponent={ListItemSeparator}
      ListFooterComponent={ListItemSeparator}
    />
  )
}

const commonStyles = StyleSheet.create({
  contentContainer: {
    paddingHorizontal: 20,
  },
})

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
