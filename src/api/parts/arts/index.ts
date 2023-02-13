import { apiManager } from '../../apiManager'
import { AllArtWorksProps, AllArtWorksResponse } from './types'

const arts = apiManager.endpoint('arts')
const all = arts.get<AllArtWorksResponse, AllArtWorksProps | void>('all')
export const artsApi = {
  all,
}
