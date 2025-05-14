import { useMutation, useQuery } from '@tanstack/react-query'
import {
  GroupDto,
  GroupResponse,
  PaginationResult,
  PaginatorQuery,
  groupService,
} from 'shared/api'
import { MutationOptions, QueryOptions } from 'shared/types'

export const groupKeys = {
  all: ['groups'],
  create: ['groups', 'create'],
  update: ['groups', 'update'],
  delete: ['groups', 'delete'],
}

export const useGroupsQuery = (
  query?: PaginatorQuery,
  options?: QueryOptions<PaginationResult<GroupResponse>>
) => {
  return useQuery({
    queryKey: [...groupKeys.all, ...Object.values(query || {})],
    queryFn: () => groupService.getAllByQuery(query),
    ...options,
  })
}

export const useGroupCreateMutation = (
  options?: MutationOptions<string, Error, GroupDto>
) => {
  return useMutation({
    mutationKey: groupKeys.create,
    mutationFn: (dto: GroupDto) => groupService.create(dto),
    ...options,
  })
}

export const useGroupUpdateMutation = (
  id: string,
  options?: MutationOptions<string, Error, GroupDto>
) => {
  return useMutation({
    mutationKey: groupKeys.update,
    mutationFn: (dto: GroupDto) => groupService.update(id, dto),
    ...options,
  })
}

export const useGroupDeleteMutation = (
  options?: MutationOptions<string, Error, string>
) => {
  return useMutation({
    mutationKey: groupKeys.delete,
    mutationFn: (id: string) => groupService.delete(id),
    ...options,
  })
}
