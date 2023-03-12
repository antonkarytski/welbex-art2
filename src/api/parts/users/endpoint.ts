import { apiManager } from '../../apiManager'

export const usersEndpoint = apiManager.endpoint('users').protect()
// export const usersUnprotectedEndpoint = usersEndpoint.unprotect()
