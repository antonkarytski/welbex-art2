import { ContentType } from '@heyheyjude/toolkit'
import { formDataFromList } from '../../../lib/files/formData'
import { ImageFile } from '../../../lib/files/types'
import { apiManager } from '../../apiManager'
import {
  MyProfileResponse,
  SignUpBody,
  SignUpResponse,
  UserProfileResponse,
} from './types.api'
import { ProfileEditProps } from './types.parts'

export const usersEndpoint = apiManager.endpoint('users').protect()
export const meEndpoint = usersEndpoint.endpoint('me')

const signUp = usersEndpoint
  .post<SignUpResponse, SignUpBody>('create')
  .unprotect()

const profileProtected = usersEndpoint.get<UserProfileResponse, number>(
  (id) => `${id}/profile`
)
const profile = profileProtected.unprotect()

const follow = usersEndpoint.put<string, number>((id) => `${id}/follow`)
const unfollow = usersEndpoint.put<string, number>((id) => `${id}/unfollow`)

//dont use this request directly, use meRequest from profile/request.ts
//since meRequest change profile store
const me = meEndpoint.get<MyProfileResponse>()
const editMe = meEndpoint.patch<ProfileEditProps, ProfileEditProps>(
  'profile/edit'
)
const deleteMe = meEndpoint.delete('profile')
const deleteAvatar = meEndpoint.delete('profile/delete-avatar')
const uploadAvatar = meEndpoint.put<string, ImageFile>({
  endpoint: 'profile/upload-avatar',
  contentType: ContentType.FORM_DATA,
  fn: (file) => ({
    body: formDataFromList({ avatar: file }),
  }),
})

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
  editMe,
  deleteMe,
  signUp,
  profile,
  profileProtected,
  follow,
  unfollow,
  uploadChildDocument,
  deleteAvatar,
  uploadAvatar,
}
