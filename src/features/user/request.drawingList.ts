import { createEffect } from 'effector'
import { getUserDrawings } from '../../_mock/usersDrawings'
import { UserDrawingListType } from './types'

type GetUserDrawingsListProps = {
  userId: string
  type: UserDrawingListType
  page?: number
}

export const getUserDrawingsList = createEffect(
  ({ userId, type, page = 0 }: GetUserDrawingsListProps) => {
    return getUserDrawings(userId, type, page)
  }
)
