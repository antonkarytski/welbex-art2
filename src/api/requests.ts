import { RequestManager } from '../lib/componentsModels/apiBuilder/request'
import { TokenRefresherProps } from '../lib/componentsModels/apiBuilder/types'

export const requestManager = new RequestManager({
  //TODO: add token refresh request
  tokenRefresher: async ({}: TokenRefresherProps) => '',
})
