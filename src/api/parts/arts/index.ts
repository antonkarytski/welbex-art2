import { getMime } from '../../../lib/files/mimeType'
import { ContentType } from '../../../lib/models/apiBuilder/types'
import { apiManager } from '../../apiManager'
import {
  AllArtWorksProps,
  AllArtWorksResponse,
  ArtWork,
  ArtWorkCreateProps,
  ArtWorkCreateResponse,
  ArtWorksFilterProps,
  CountOfFilteredArtsResponse,
} from './types'

const arts = apiManager.endpoint('arts')
const all = arts.get<AllArtWorksResponse, AllArtWorksProps | void>('all')
const specific = arts.get<ArtWork, number>((id) => id)
const countOfFiltered = arts.get<
  CountOfFilteredArtsResponse,
  ArtWorksFilterProps
>('total')

const create = arts.post<ArtWorkCreateResponse, ArtWorkCreateProps>({
  endpoint: 'create',
  contentType: ContentType.FORM_DATA,
  fn: (props) => {
    const formData = new FormData()
    formData.append('image', {
      ...props.image,
      type: getMime(props.image.uri),
    } as any as Blob)
    formData.append('child_identity_document', {
      ...props.childDocument,
      type: getMime(props.childDocument.uri),
    } as any as Blob)
    formData.append('title', props.title)
    formData.append('category_id', props.categoryId.toString())
    return {
      body: formData,
    }
  },
})

export const artsApi = {
  all,
  specific,
  countOfFiltered,
}
