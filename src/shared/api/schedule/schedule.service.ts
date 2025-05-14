import { fetchAuth } from '../fetch'
import {
  ScheduleWeekCreateDto,
  ScheduleWeekResponse,
  ScheduleWeekUpdateDto,
} from './schedule.types'

class ScheduleService {
  getWeeks(groupId: string) {
    return fetchAuth.get<
      {
        from: string
        to: string
      }[]
    >(`schedule/weeks/${groupId}`)
  }

  getActualWeekSchedule(accessToken: string, groupId: string) {
    return fetchAuth.get<ScheduleWeekResponse>(`schedule/actual/${groupId}`, {
      headers: accessToken
        ? {
            Authorization: `Bearer ${accessToken}`,
          }
        : {},
    })
  }

  getWeekSchedule(
    groupId: string,
    accessToken?: string,
    query?: { from: string; to: string }
  ) {
    return fetchAuth.get<ScheduleWeekResponse>(`schedule/${groupId}`, {
      params: query,
      headers: accessToken ? { Authorization: `Bearer ${accessToken}` } : {},
    })
  }

  createWeekSchedule(groupId: string, dto: ScheduleWeekCreateDto) {
    return fetchAuth.post<boolean>(`schedule/weeks/${groupId}`, dto)
  }

  updateWeekSchedule(groupId: string, dto: ScheduleWeekUpdateDto) {
    return fetchAuth.post<boolean>(`schedule/weeks/${groupId}`, dto)
  }
}

export const scheduleService = new ScheduleService()
