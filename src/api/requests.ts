import { ApiManager } from '../lib/componentsModels/apiBuilder/request'
import { TokenRefresherProps } from '../lib/componentsModels/apiBuilder/types'

export const requestManager = new ApiManager({
  //TODO: add token refresh request
  tokenRefresher: async ({}: TokenRefresherProps) => '',
})
