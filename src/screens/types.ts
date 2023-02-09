import React from 'react'
import { links } from '../navigation/links'
import { ScreenComponentProps } from '../navigation/types.screenProps'
import { UnionFrom } from '../types'

export type ComponentsList = {
  [L in links]: {
    component: (props: ScreenComponentProps<L>) => React.ReactElement | null
    name: L
  }
}

export type RoutesList = UnionFrom<ComponentsList>[]
