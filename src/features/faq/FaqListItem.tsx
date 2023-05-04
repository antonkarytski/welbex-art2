import React from 'react'
import { FaqItem } from '../../api/parts/faq/types'
import AccordionTab, {
  AccordionTabProps,
  TabStyles,
} from '../../ui/AccordionTab'
import { ColorThemeStructure } from '../themed/theme'

type FaqListItemProps = {
  item: FaqItem
  styles: TabStyles
  colors: ColorThemeStructure
  onOpen?: AccordionTabProps['onOpen']
}

const FaqListItem = React.memo(
  ({ item, styles, colors, onOpen }: FaqListItemProps) => {
    return (
      <AccordionTab
        label={item.question}
        content={item.answer}
        toggleIconColor={colors.text}
        style={styles}
        onOpen={onOpen}
      />
    )
  }
)

export default FaqListItem
