import React from 'react'
import { View } from 'react-native'
import { useText } from '../../translations/hook'
import { LangFn } from '../../translations/types'
import CheckListItem from '../../ui/lists/CheckListItem'
import { SubscriptionBenefitsBlockStyles } from './styles'

type SubscriptionBenefitsBlockProps = {
  iconColor?: string
  style?: SubscriptionBenefitsBlockStyles
}

type BenefitDescriptor = {
  label: LangFn
}

const BENEFITS_LIST: BenefitDescriptor[] = [
  { label: (text) => text.disableAds },
  { label: (text) => text.increasedNumberOfContestUploads },
  { label: (text) => text.supportChildCreativity },
]

const SubscriptionBenefitsBlock = ({
  iconColor,
  style,
}: SubscriptionBenefitsBlockProps) => {
  const text = useText()

  return (
    <View style={style?.container}>
      {BENEFITS_LIST.map(({ label }, index) => {
        return (
          <CheckListItem
            key={index}
            color={iconColor}
            style={style?.item}
            textStyle={style?.itemText}
            label={label(text)}
          />
        )
      })}
    </View>
  )
}

export default SubscriptionBenefitsBlock
