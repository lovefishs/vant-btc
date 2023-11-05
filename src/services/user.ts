import { http } from '@/utils'

export async function userLogin(data: any) {
  return http.post('/user/login', data)
}

export async function userRegister(data: any) {
  return http.post('/user/register', data)
}
