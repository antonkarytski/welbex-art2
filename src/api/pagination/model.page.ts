import { createEvent, createStore } from 'effector'
import { SetNextPageProps } from './types'

export const getNextPage = ({ total, page, size }: SetNextPageProps) => {
  if (total > page * size) return page + 1
  return null
}

export const createNextPageModel = () => {
  const initialPage = 1
  const setNextPage = createEvent<SetNextPageProps | null>()
  const reset = createEvent()
  const $nextPage = createStore<null | number>(initialPage)
    .on(setNextPage, (_, props) => props && getNextPage(props))
    .on(reset, () => initialPage)

  return {
    $nextPage,
    setNextPage,
    reset,
  }
}
