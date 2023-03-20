import {
  combine,
  createEffect,
  createEvent,
  createStore,
  restore,
} from 'effector'
import { DRAWING_ITEM_HEIGHT } from '../../artWork/constants'
import { UserDrawingListType } from '../types'
import {
  Route,
  TabMenuNavigationProps,
  UserArtsListHeightModel,
  UserArtsTabMenuNavigationModel,
  UserDrawingsListHeight,
} from './types'

const USER_ARTS_SKELETON_ROWS_COUNT = 3

export const USER_ARTS_SKELETON_HEIGHT =
  DRAWING_ITEM_HEIGHT * USER_ARTS_SKELETON_ROWS_COUNT

export const createUserArtsListHeightModel = (): UserArtsListHeightModel => {
  const initialListsHeight = {
    [UserDrawingListType.OWN]: USER_ARTS_SKELETON_HEIGHT,
    [UserDrawingListType.LIKED]: USER_ARTS_SKELETON_HEIGHT,
    [UserDrawingListType.SAVED]: USER_ARTS_SKELETON_HEIGHT,
  }

  const initialOffsetsValues = {
    [UserDrawingListType.OWN]: 0,
    [UserDrawingListType.LIKED]: 0,
    [UserDrawingListType.SAVED]: 0,
  }

  const updateListsHeight = createEvent<Partial<UserDrawingsListHeight>>()

  const $listsHeight = createStore<UserDrawingsListHeight>(
    initialListsHeight
  ).on(updateListsHeight, (state, payload) => ({
    ...state,
    ...payload,
  }))

  const updateListOffset = createEvent<Partial<UserDrawingsListHeight>>()

  const $listsOffsets = createStore<UserDrawingsListHeight>(
    initialOffsetsValues
  ).on(updateListOffset, (state, payload) => ({
    ...state,
    ...payload,
  }))

  const setActiveListTabKey = createEvent<UserDrawingListType>()

  const $activeListTabKey = restore(
    setActiveListTabKey,
    UserDrawingListType.OWN
  )

  const reset = () => {
    setActiveListTabKey(UserDrawingListType.OWN)
    updateListsHeight(initialListsHeight)
    updateListOffset(initialOffsetsValues)
  }

  return {
    updateListsHeight,
    $listsHeight,
    updateListOffset,
    $listsOffsets,
    setActiveListTabKey,
    $activeListTabKey,
    reset,
  }
}

export const createUserArtsTabMenuNavigationModel =
  (): UserArtsTabMenuNavigationModel => {
    const set = createEffect<TabMenuNavigationProps, void>()

    const setRoutes = createEvent<Route[] | null>()
    const $routes = restore<Route[] | null>(setRoutes, null)

    const setIndex = createEvent<number | null>()
    const $index = restore(setIndex, null)

    const setPosition = createEvent<any>()
    const $position = restore(setPosition, null)

    const setJumpTo = createEvent<TabMenuNavigationProps['jumpTo'] | null>()
    const $jumpTo = restore(setJumpTo, null)

    const setLayout = createEvent<TabMenuNavigationProps['layout'] | null>()
    const $layout = restore(setLayout, null)

    set.watch((payload) => {
      setRoutes(payload.navigationState.routes)
      setIndex(payload.navigationState.index)
      setPosition(payload.position)
      setJumpTo(payload.jumpTo)
      setLayout(payload.layout)
    })

    const reset = () => {
      setRoutes(null)
      setIndex(null)
      setPosition(null)
      setJumpTo(null)
      setLayout(null)
    }

    const $store = combine(
      {
        routes: $routes,
        index: $index,
        position: $position,
        jumpTo: $jumpTo,
        layout: $layout,
      },
      (data) => data
    )

    return {
      set,
      $store,
      reset,
    }
  }
