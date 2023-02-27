import { createEvent, createStore } from 'effector'

type SetNextPageProps = {
  total: number
  page: number
  size: number
}

export const getNextPage = ({ total, page, size }: SetNextPageProps) => {
  if (total > page * size) return page + 1
  return null
}

export const createNextPageModel = () => {
  const setNextPage = createEvent<SetNextPageProps>()
  const $nextPage = createStore<null | number>(1).on(setNextPage, (_, props) =>
    getNextPage(props)
  )

  return {
    $nextPage,
    setNextPage,
  }
}
