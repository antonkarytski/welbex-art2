import { NavigationProp, useNavigation } from '@react-navigation/native'
import React from 'react'
import { useNavigate } from '../../../navigation'
import { ScreensProps } from '../../../navigation/types.screenProps'
import { useText } from '../../../translations/hook'
import { LangFn } from '../../../translations/types'
import { SVGImageProps } from '../../../ui/images/_types'
import { InfoMessageScreenVariant } from '../types'
import InfoMessageContainer from './InfoMessageContainer'
import InfoMessageContent from './InfoMessageContent'

type OnButtonPressProps = {
  navigate: ReturnType<typeof useNavigate>
  goBack: () => void
}

export type InfoMessageProps = {
  buttonLabel: LangFn
  onButtonPress: (props: OnButtonPressProps) => void
  Image: (props: SVGImageProps) => React.ReactElement
  title: LangFn
  subTitle?: LangFn
  variant?: InfoMessageScreenVariant
}

const InfoMessage = ({
  buttonLabel,
  onButtonPress,
  subTitle,
  title,
  Image,
  variant,
}: InfoMessageProps) => {
  const text = useText()
  const navigation = useNavigation<NavigationProp<ScreensProps>>()

  return (
    <InfoMessageContainer
      variant={variant}
      buttonLabel={buttonLabel(text)}
      onButtonPress={() => onButtonPress(navigation)}
    >
      <InfoMessageContent
        variant={variant}
        Image={Image}
        title={title(text)}
        subTitle={subTitle?.(text)}
      />
    </InfoMessageContainer>
  )
}

export default InfoMessage
