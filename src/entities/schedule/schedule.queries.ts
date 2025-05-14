import { useMutation, useQuery } from '@tanstack/react-query'
import { ScheduleWeekCreateDto, scheduleService } from 'shared/api/schedule'
import { MutationOptions, QueryOptions } from 'shared/types'

export const scheduleKeys = {
  create: ['schedule', 'create'],
  weeks: ['schedule', 'weeks'],
}

export const useScheduleWeeksQuery = (
  groupId: string,
  options?: QueryOptions<{ from: string; to: string }[]>
) => {
  return useQuery({
    queryKey: [...scheduleKeys.weeks, groupId],
    queryFn: () => scheduleService.getWeeks(groupId),
    ...options,
  })
}

export const useScheduleCreateMutation = (
  groupId: string,
  options?: MutationOptions<boolean, Error, ScheduleWeekCreateDto>
) => {
  return useMutation({
    mutationKey: scheduleKeys.create,
    mutationFn: (dto: ScheduleWeekCreateDto) =>
      scheduleService.createWeekSchedule(groupId, dto),
    ...options,
  })
}
