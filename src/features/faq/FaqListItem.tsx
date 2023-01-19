import React from 'react'
import { FaqItem } from '../../_mock/faq'
import Tab from '../../ui/Tab'
import { createThemedStyle } from '../themed'
import { useTheme } from '../themed/hooks'

type FaqListItemProps = {
  item: FaqItem
}

const FaqListItem = ({ item }: FaqListItemProps) => {
  const { styles, colors } = useTheme(themedTabStyles)

  return (
    <Tab
      label={item.question}
      content={item.answer}
      toggleIconColor={colors.text}
      style={styles}
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

export default FaqListItem
