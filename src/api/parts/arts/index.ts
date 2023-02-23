import { apiManager } from '../../apiManager'
import { AllArtWorksProps, AllArtWorksResponse, ArtWork } from './types'

const arts = apiManager.endpoint('arts')
const all = arts.get<AllArtWorksResponse, AllArtWorksProps | void>('all')
const specific = arts.get<ArtWork, number>((id) => id)

export const artsApi = {
  all,
  specific,
}
