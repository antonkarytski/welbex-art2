import { ProfileEditProps } from '../../../api/parts/users/types.parts'

export type ProfileDataFilter = Partial<Record<keyof ProfileEditProps, boolean>>
