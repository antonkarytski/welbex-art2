import { attach, createEffect, createEvent, createStore } from 'effector'
import { mockGetGallery } from '../../_mock/gelleries'
import { api } from '../../api'
import { createPaginationListModel } from '../../api/pagination'
import { addGalleryPage, setGallery } from './model'
import { GalleriesList, GallerySetter, GalleryType } from './types'

export const galleryRequest = createPaginationListModel({
  pageSize: 10,
  request: api.arts.all, // TODO: change to specific type when API will be ready
})

type GetGalleryProps = {
  type: GalleryType
}

type GalleriesNextRequest = GalleriesList<string | null>
type SetNextPageProps = GallerySetter<{
  request: string | null
}>

const setNextPageRequest = createEvent<SetNextPageProps>()
const $galleryNextPagesRequests = createStore<GalleriesNextRequest | null>(
  null
).on(setNextPageRequest, (state = {}, { type, request }) => ({
  ...state,
  [type]: request,
}))

export const getGalleryRequest = createEffect(({ type }: GetGalleryProps) => {
  return mockGetGallery(type)
})

export const getGalleryNextPageRequest = attach({
  source: $galleryNextPagesRequests,
  mapParams: (props: GetGalleryProps, source) => ({
    props,
    request: source?.[props.type],
  }),
  effect: createEffect(
    ({
      props,
      request,
    }: {
      props: GetGalleryProps
      request: string | undefined | null
    }) => {
      if (!request) return
      return mockGetGallery(props.type, request)
    }
  ),
})

getGalleryRequest.done.watch(({ params, result }) => {
  setGallery({ type: params.type, drawings: result.data })
  if (result.next)
    setNextPageRequest({ type: params.type, request: result.next })
})

getGalleryNextPageRequest.done.watch(({ result, params }) => {
  setNextPageRequest({ type: params.type, request: result?.next ?? null })
  if (!result) return
  addGalleryPage({ type: params.type, drawings: result.data })
})
