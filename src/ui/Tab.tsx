import { View } from 'native-base'
import React, { PropsWithChildren, ReactNode } from 'react'
import {
  StyleProp,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from 'react-native'
import { useToggle } from 'altek-toolkit'
import Row from './Row'
import Span, { SpanProps } from './Span'
import MinusIcon from './icons/Icon.Minus'
import PlusIcon from './icons/Icon.Plus'

export type TabStyles = {
  wrapper?: StyleProp<ViewStyle>
  tab?: StyleProp<ViewStyle>
  label?: StyleProp<TextStyle>
  label__opened?: StyleProp<TextStyle>
  toggleIcon_wrapper?: StyleProp<ViewStyle>
  dropdownContainer?: StyleProp<ViewStyle>
  contentText?: StyleProp<TextStyle>
}

type TabProps = PropsWithChildren<{
  label?: string
  labelComponent?: ReactNode
  content?: string
  toggleIconColor?: string
  toggleIconSize?: number
  style?: TabStyles
  labelFontWeight?: SpanProps['weight']
  contentFontWeight?: SpanProps['weight']
}>

const Tab = ({
  label,
  labelComponent,
  children,
  content,
  toggleIconColor = '#303535',
  toggleIconSize = 22,
  style,
  labelFontWeight,
  contentFontWeight,
}: TabProps) => {
  const [isOpened, toggleIsOpened] = useToggle(false)

  const Icon = isOpened ? MinusIcon : PlusIcon
  return (
    <TouchableOpacity
      activeOpacity={0.6}
      onPress={toggleIsOpened}
      style={[styles.wrapper, style?.wrapper]}
    >
      <Row style={[styles.tab, style?.tab]}>
        {labelComponent || (
          <Span
            label={label}
            weight={labelFontWeight || 500}
            style={[styles.label, isOpened && styles.label__opened]}
          />
        )}
        <View style={[styles.toggleIcon_wrapper, style?.toggleIcon_wrapper]}>
          <Icon size={toggleIconSize} color={toggleIconColor} />
        </View>
      </Row>
      {isOpened && (
        <View style={[styles.dropdownContainer, style?.dropdownContainer]}>
          {children || (
            <Span
              label={content}
              style={[styles.contentText, style?.contentText]}
              weight={contentFontWeight || 400}
            />
          )}
        </View>
      )}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    paddingVertical: 22,
  },
  tab: {
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  label: {
    fontSize: 16,
    lineHeight: 19,
    color: '#303535',
  },
  label__opened: {
    color: '#347B81',
  },
  toggleIcon_wrapper: {
    marginLeft: 'auto',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dropdownContainer: {
    paddingTop: 9,
    paddingRight: 30,
  },
  contentText: {
    color: '#616868',
    fontSize: 14,
    lineHeight: 21,
  },
})

export default Tab
