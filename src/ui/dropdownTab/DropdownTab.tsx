import React, { useRef } from 'react'
import { Modal, TouchableOpacity, View } from 'react-native'
import { defaultColors } from '../../features/themed/theme'
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
  iconColors,
  onOpenDropdown,
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

  const handleOpenDropdown = () => {
    dropdownButtonRef.current?.measure((fx, fy, w, h, px, py) => {
      onDropdownButtonLayout({ w, h, px, py })
      setIsOpened(true)
    })
    onOpenDropdown?.()
  }

  const onCloseDropdown = () => {
    setIsOpened(false)
  }
  return (
    <View style={[styles.wrapper, style?.wrapper]}>
      {label && (
        <Span
          style={[styles.label, style?.label, isOpened && style?.activeLabel]}
          weight={500}
        >
          {label}
        </Span>
      )}
      <TouchableOpacity
        ref={dropdownButtonRef}
        activeOpacity={0.6}
        onPress={handleOpenDropdown}
        style={[
          styles.tab,
          style?.tab,
          isOpened && [styles.activeTab, style?.activeTab],
        ]}
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
            size={10}
            style={[style?.tabIcon, isOpened && styles.toggleIcon__opened]}
            color={
              isOpened
                ? iconColors?.opened || defaultColors.detailsActive
                : iconColors?.default
            }
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
