import { LogInForm } from '../features/auth/logIn/model'

export const MOCK_LOGIN_USERS: LogInForm[] = [
  {
    email: 'heyhey',
    password: '1111',
  },
  {
    email: '',
    password: '',
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
