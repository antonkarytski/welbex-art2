import React, { useRef } from 'react'
import { Modal, TouchableOpacity, View } from 'react-native'
import DropdownContainer from '../DropdownContainer'
import Overlay from '../Overlay'
import Row from '../Row'
import Span from '../Span'
import ArrowIcon from '../icons/Icon.ArrowToggle'
import { useDropdownLayout } from './hooks'
import { styles } from './styles'
import { DropdownTabProps } from './types'

function DropdownTab({
  label,
  tabLabel = 'Dropdown tab',
  children,
  indentFromTab = 4,
  style,
  overlayBackgroundColor,
}: DropdownTabProps) {
  const dropdownButtonRef = useRef<TouchableOpacity>(null)
  const {
    isOpened,
    setIsOpened,
    onDropdownButtonLayout,
    calculatedContainerStyle,
  } = useDropdownLayout({
    dropdownStyle: style?.dropdownContainer,
    indentFromTab,
  })

  const onOpenDropdown = () => {
    dropdownButtonRef.current?.measure((fx, fy, w, h, px, py) => {
      onDropdownButtonLayout({ w, h, px, py })
      setIsOpened(true)
    })
  }

  const onCloseDropdown = () => {
    setIsOpened(false)
  }
  return (
    <View style={[styles.wrapper, style?.wrapper]}>
      {label && (
        <Span
          style={[styles.label, style?.label, isOpened && style?.activeLabel]}
        >
          {label}
        </Span>
      )}
      <TouchableOpacity
        ref={dropdownButtonRef}
        activeOpacity={0.6}
        onPress={onOpenDropdown}
        style={[styles.tab, style?.tab, isOpened && style?.activeTab]}
      >
        <Row style={[styles.tabInnerWrapper, style?.tabInnerWrapper]}>
          <Span
            style={[
              styles.tabLabel,
              style?.tabLabel,
              isOpened && style?.activeTabLabel,
            ]}
          >
            {tabLabel}
          </Span>
          <ArrowIcon
            size={8}
            style={[style?.tabIcon, isOpened && styles.toggleIcon__opened]}
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
