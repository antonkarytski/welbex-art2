import { apiManager } from '../../apiManager'

export const usersEndpoint = apiManager.endpoint('users').protect()
