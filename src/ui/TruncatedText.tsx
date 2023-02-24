import React, { PropsWithChildren, useState } from 'react'
import {
  StyleProp,
  StyleSheet,
  TextProps,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native'
import { useToggle } from 'altek-toolkit'
import Span from './Span'
import TextButton, { TextButtonStyle } from './buttons/Button.Text'

export type TruncatedTextStyles = {
  container?: StyleProp<ViewStyle>
  text?: StyleProp<TextStyle>
  button?: TextButtonStyle
}

type TruncatedTextProps = PropsWithChildren<{
  text?: string
  numberOfLines?: number
  showMoreLabel?: string
  showLessLabel?: string
  style?: TruncatedTextStyles
}>

const TruncatedText = ({
  children,
  text,
  numberOfLines = 5,
  showMoreLabel = 'Show more',
  showLessLabel = 'Show less',
  style,
}: TruncatedTextProps) => {
  const [isTruncated, toggleIsTruncated] = useToggle(true)
  const [linesCount, setLinesCount] = useState(0)

  const onTextLayout: TextProps['onTextLayout'] = ({ nativeEvent }) => {
    if (!linesCount) setLinesCount(nativeEvent.lines.length)
  }

  return (
    <View style={style?.container}>
      <Span
        label={text}
        onTextLayout={onTextLayout}
        numberOfLines={linesCount && isTruncated ? numberOfLines : undefined}
        style={style?.text}
      >
        {children}
      </Span>
      {linesCount > numberOfLines && (
        <TextButton
          label={isTruncated ? showMoreLabel : showLessLabel}
          onPress={toggleIsTruncated}
          style={{ ...buttonStyles, ...style?.button }}
        />
      )}
    </View>
  )
}

const buttonStyles = StyleSheet.create({
  button: {
    paddingVertical: 6,
    paddingHorizontal: 0,
    marginTop: 6,
  },
})

export default TruncatedText
