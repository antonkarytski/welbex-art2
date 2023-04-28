import React from 'react'
import { useNavigate } from '../../../navigation'
import { useText } from '../../../translations/hook'
import { LangFn } from '../../../translations/types'
import { SVGImageProps } from '../../../ui/images/_types'
import InfoMessageContainer from './InfoMessageContainer'
import InfoMessageContent from './InfoMessageContent'

type OnButtonPressProps = {
  navigate: ReturnType<typeof useNavigate>
}

type CreateInfoMessageProps = {
  Icon: (props: SVGImageProps) => React.ReactElement
  title: LangFn
  subTitle?: LangFn
  onButtonPress: (props: OnButtonPressProps) => void
  buttonLabel: LangFn
}

export function createInfoMessage(props: CreateInfoMessageProps) {
  return ({
    buttonLabel = props.buttonLabel,
    title = props.title,
  }: Partial<Omit<CreateInfoMessageProps, 'Icon, onButtonPress'>>) => {
    const text = useText()
    const navigate = useNavigate()

    return (
      <InfoMessageContainer
        buttonLabel={buttonLabel(text)}
        onButtonPress={() => props.onButtonPress({ navigate })}
      >
        <InfoMessageContent Image={props.Icon} title={title(text)} />
      </InfoMessageContainer>
    )
  }
}
