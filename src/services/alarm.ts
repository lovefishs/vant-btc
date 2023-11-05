import { stringify } from 'qs'

import { http } from '@/utils'

export async function createAlarm(data: any) {
  return http.post('/alarm', data)
}

export async function alarmList(params: any = {}) {
  return http.get(`/alarm?${stringify(params)}`)
}
