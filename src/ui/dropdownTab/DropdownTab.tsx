import React, { forwardRef, useImperativeHandle, useRef } from 'react'
import { Modal, TouchableOpacity, View } from 'react-native'
import DropdownContainer from '../DropdownContainer'
import Overlay from '../Overlay'
import Row from '../Row'
import Span from '../Span'
import ArrowIcon from '../icons/Icon.ArrowToggle'
import { useDropdownLayout } from './hooks'
import { dropdownStyles } from './styles'
import { defaultDropdownTabPreset, useDropdownTabPreset } from './styles.preset'
import { DropdownTabProps } from './types'

export type DropdownTabInstance = {
  close: () => void
} | null

const DropdownTab = forwardRef<DropdownTabInstance, DropdownTabProps>(
  (
    {
      label,
      tabLabel = 'Dropdown tab',
      children,
      indentFromTab = 4,
      style,
      overlayBackgroundColor,
      onOpenDropdown,
      preset = defaultDropdownTabPreset,
      considerKeyboard,
    }: DropdownTabProps,
    ref
  ) => {
    const dropdownButtonRef = useRef<TouchableOpacity>(null)
    const {
      isOpened,
      setIsOpened,
      onDropdownButtonLayout,
      calculatedContainerStyle,
    } = useDropdownLayout({
      dropdownStyle: style?.dropdownContainer,
      indentFromTab,
      considerKeyboard,
    })
    const activeStyles = useDropdownTabPreset({ isOpened, preset })

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

    useImperativeHandle(ref, () => ({
      close: onCloseDropdown,
    }))

    return (
      <View style={[dropdownStyles.wrapper, style?.wrapper]}>
        {label && (
          <Span
            style={[dropdownStyles.label, style?.label, activeStyles.label]}
            weight={500}
          >
            {label}
          </Span>
        )}
        <TouchableOpacity
          ref={dropdownButtonRef}
          activeOpacity={0.6}
          onPress={handleOpenDropdown}
          style={[dropdownStyles.tab, activeStyles.tab, style?.tab]}
        >
          <Row style={[dropdownStyles.tabInnerWrapper, style?.tabInnerWrapper]}>
            <Span
              style={[
                dropdownStyles.tabLabel,
                activeStyles.tabLabel,
                style?.tabLabel,
              ]}
            >
              {tabLabel}
            </Span>
            <ArrowIcon
              size={10}
              style={[
                style?.tabIcon,
                isOpened && dropdownStyles.toggleIcon__opened,
              ]}
              color={activeStyles.iconColor}
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
)

export default DropdownTab
