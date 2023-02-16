import { createEvent, createStore } from 'effector'

type SetNextPageProps = {
  total: number
  page: number
  size: number
}

export const createNextPageModel = () => {
  const setNextPage = createEvent<SetNextPageProps>()
  const $nextPage = createStore<null | number>(1).on(
    setNextPage,
    (_, { total, page, size }) => {
      if (total > page * size) return page + 1
      return null
    }
  )

  return {
    $nextPage,
    setNextPage,
  }
}
