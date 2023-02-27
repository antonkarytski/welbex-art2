import { apiManager } from '../../apiManager'
import {
  AllArtWorksProps,
  AllArtWorksResponse,
  ArtWork,
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

export const artsApi = {
  all,
  specific,
  countOfFiltered,
}
