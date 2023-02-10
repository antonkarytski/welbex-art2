import { db } from '../lib/db'
import { RequestManager } from '../lib/models/apiBuilder/request'
import { TokenRefresherProps } from '../lib/models/apiBuilder/types'

export const requestManager = new RequestManager({
  //TODO: add token refresh request
  tokenRefresher: async ({ currentToken }: TokenRefresherProps) => '',
  saveTo: db.fields.TOKEN,
})
