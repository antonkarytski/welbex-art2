import { createEffect } from 'effector'
import { getUserDrawings } from '../../_mock/usersDrawings'
import { Drawing } from '../drawing/types'
import { UserDrawingListType } from './types'

type GetUserDrawingsListProps = {
  userId: string
  type: UserDrawingListType
  page?: number
}

export type GetUserDrawingsListRequestResult = {
  result: null | Drawing[]
  next: null | number
}

export const getUserDrawingsList = createEffect(
  ({ userId, type, page = 0 }: GetUserDrawingsListProps) => {
    return getUserDrawings(
      userId,
      type,
      page
    ) as GetUserDrawingsListRequestResult
  }
)
