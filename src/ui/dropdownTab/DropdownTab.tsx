import React, { ReactNode, useRef } from 'react'
import { Modal, TouchableOpacity, View } from 'react-native'
import DropdownContainer from '../DropdownContainer'
import Overlay from '../Overlay'
import Row from '../Row'
import Span from '../Span'
import ArrowIcon from '../icons/Icon.ArrowToggle'
import { useDropdownLayout } from './hooks'
import { dropdownStyles } from './styles'
import { DropdownStyles } from './types'

type DropdownTabProps = {
  label?: string | ReactNode
  tabLabel: string | ReactNode
  children: ReactNode | ReactNode[]
  indentFromTab?: number
  styles?: DropdownStyles
  overlayBackgroundColor?: string
}

function DropdownTab({
  label,
  tabLabel = 'Dropdown tab',
  children,
  indentFromTab = 4,
  styles,
  overlayBackgroundColor,
}: DropdownTabProps) {
  const dropdownButtonRef = useRef<TouchableOpacity>(null)
  const {
    isOpened,
    setIsOpened,
    onDropdownButtonLayout,
    calculatedContainerStyle,
  } = useDropdownLayout({
    dropdownStyle: styles?.dropdownContainer,
    indentFromTab,
  })

  const onOpenDropdown = () => {
    dropdownButtonRef.current?.measure((fx, fy, w, h, px, py) => {
      console.log('fx, fy, w, h, px, py', fx, fy, w, h, px, py)
      onDropdownButtonLayout({ w, h, px, py })
      setIsOpened(true)
    })
  }

  const onCloseDropdown = () => {
    setIsOpened(false)
  }
  return (
    <View style={dropdownStyles.wrapper}>
      {label && (
        <Span style={[dropdownStyles.label, styles?.label]}>{label}</Span>
      )}
      <TouchableOpacity
        ref={dropdownButtonRef}
        activeOpacity={0.6}
        onPress={onOpenDropdown}
        style={[dropdownStyles.tab, styles?.tab]}
      >
        <Row style={[dropdownStyles.tabInnerWrapper, styles?.tabInnerWrapper]}>
          <Span style={[dropdownStyles.tabLabel, styles?.tabLabel]}>
            {tabLabel}
          </Span>
          <ArrowIcon
            size={8}
            style={[
              styles?.tabIcon,
              isOpened && dropdownStyles.toggleIcon__opened,
            ]}
          />
        </Row>
      </TouchableOpacity>
      {isOpened && (
        <Modal visible={isOpened} animationType={'none'} transparent={true}>
          <Overlay
            onPress={onCloseDropdown}
            backgroundColor={overlayBackgroundColor}
          />
          <DropdownContainer style={calculatedContainerStyle}>
            {children}
          </DropdownContainer>
        </Modal>
      )}
    </View>
  )
}

export default DropdownTab
