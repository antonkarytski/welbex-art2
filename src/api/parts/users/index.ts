import { formDataFromList } from '../../../lib/files/formData'
import { ImageFile } from '../../../lib/files/types'
import { ContentType } from '../../../lib/models/apiBuilder/types'
import { apiManager } from '../../apiManager'
import {
  MyProfileResponse,
  SignUpBody,
  SignUpResponse,
  UserProfileResponse,
} from './types.api'

export const usersEndpoint = apiManager.endpoint('users').protect()
export const meEndpoint = usersEndpoint.endpoint('me')

const signUp = usersEndpoint.post<SignUpResponse, SignUpBody>({
  endpoint: 'create',
  withToken: false,
})
const profile = usersEndpoint.get<UserProfileResponse, number>(
  (id) => `${id}/profile`
)
const follow = usersEndpoint.put<string, number>((id) => `${id}/follow`)
const unfollow = usersEndpoint.put<string, number>((id) => `${id}/unfollow`)

//dont use this request directly, use meRequest from profile/request.ts
//since meRequest change profile store
const me = meEndpoint.get<MyProfileResponse>()
const uploadChildDocument = meEndpoint
  .put<string, ImageFile>({
    endpoint: 'upload-child-identity-document',
    contentType: ContentType.FORM_DATA,
    fn: (file) => ({
      body: formDataFromList({ child_identity_document: file }),
    }),
  })
  .withProgress()

export const usersApi = {
  me,
  signUp,
  profile,
  follow,
  unfollow,
  uploadChildDocument,
}
