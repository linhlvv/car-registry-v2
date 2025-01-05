import { apiGlobal } from '@/api/index'
import { LoginBody } from '@/api/auth/interface'
const authEndpoint = {
  login: '/auth',
}

export const authApi = {
  login: (body: LoginBody) => apiGlobal.post(authEndpoint.login, body),
}
