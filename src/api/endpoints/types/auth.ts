export type LoginProps = {
  username: string
  password: string
}

export type RefreshTokenProps = {
  access_token: string
  refresh_token: string
}

export type User = {
  email: string
  phone_number: string
  is_superuser?: boolean
  is_manager?: boolean
  first_name: string
  last_name: string
  country: string
  password: string
  DOB: string
}
