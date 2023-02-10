import { db } from '../lib/db'
import { ApiManager } from '../lib/models/apiBuilder/request'
import { TokenRefresherProps } from '../lib/models/apiBuilder/types'

export const requestManager = new ApiManager({
  //TODO: add token refresh request
  tokenRefresher: async ({ currentToken }: TokenRefresherProps) => '',
  saveTo: db.fields.TOKEN,
})
