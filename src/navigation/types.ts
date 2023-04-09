import { BottomTabBarButtonProps } from '@react-navigation/bottom-tabs'
import {
  NativeStackHeaderProps,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack'
import React, { ComponentType, FC, ReactNode } from 'react'
import { LangFn, LangStructure } from '../translations/types'
import { IconProps } from '../ui/icons/_types'
import { links } from './links'

export type CreateScreenOptionsProps = {
  //colors: ColorThemeStructure
  text: LangStructure
}

type CustomHeaderTitle<ScreenProps = any> =
  | string
  | ((props: {
      routeProps?: ScreenProps
      children: string
      tintColor?: string
    }) => ReactNode)

export type CustomStackNavigationOptions<ScreenProps = any> = Omit<
  NativeStackNavigationOptions,
  'headerTitle' | 'header'
> & {
  headerTitle?: CustomHeaderTitle<ScreenProps>
  header?: (props: NativeStackHeaderProps | CustomStackHeaderProps) => ReactNode
}

export type CustomStackHeaderProps = Omit<NativeStackHeaderProps, 'options'> & {
  options: CustomStackNavigationOptions
}

export type ScreenDescriptor = {
  link: links
  label: LangFn
  Icon: FC<IconProps>
  Component: ComponentType<any>
  customButton?: (props: BottomTabBarButtonProps) => React.ReactNode
  unmountOnBlur?: boolean
}
