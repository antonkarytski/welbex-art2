import React from 'react'
import { FaqItem } from '../../_mock/faq'
import Tab, { TabStyles } from '../../ui/Tab'
import { ColorThemeStructure } from '../themed/theme'

type FaqListItemProps = {
  item: FaqItem
  styles: TabStyles
  colors: ColorThemeStructure
}

const FaqListItem = React.memo(({ item, styles, colors }: FaqListItemProps) => {
  return (
    <Tab
      label={item.question}
      content={item.answer}
      toggleIconColor={colors.text}
      style={styles}
    />
  )
})

export default FaqListItem
