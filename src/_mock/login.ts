import { LogInForm } from '../features/logIn/model'

export const MOCK_LOGIN_USERS: LogInForm[] = [
  {
    email: 'heyheyjude23@gmail.com',
    password: '1111',
  },
]

export function mockCheckLogin(testData: LogInForm) {
  return MOCK_LOGIN_USERS.find((userData) => {
    return (
      userData.password === testData.password &&
      userData.email === testData.email
    )
  })
}
