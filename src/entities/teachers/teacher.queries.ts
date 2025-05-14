import { useMutation, useQuery } from '@tanstack/react-query'
import {
  PaginationResult,
  PaginatorQuery,
  TeacherDto,
  TeacherResponse,
  teacherService,
} from 'shared/api'
import { MutationOptions, QueryOptions } from 'shared/types'

export const teacherKeys = {
  all: ['teachers'],
  create: ['teachers', 'create'],
  update: ['teachers', 'update'],
  delete: ['teachers', 'delete'],
}

export const useTeachersQuery = (
  query?: PaginatorQuery,
  options?: QueryOptions<PaginationResult<TeacherResponse>>
) => {
  return useQuery({
    queryKey: [...teacherKeys.all, ...Object.values(query || {})],
    queryFn: () => teacherService.getAllByQuery(query),
    ...options,
  })
}

export const useTeacherCreateMutation = (
  options?: MutationOptions<string, Error, TeacherDto>
) => {
  return useMutation({
    mutationKey: teacherKeys.create,
    mutationFn: (dto: TeacherDto) => teacherService.create(dto),
    ...options,
  })
}

export const useTeacherUpdateMutation = (
  id: string,
  options?: MutationOptions<string, Error, TeacherDto>
) => {
  return useMutation({
    mutationKey: teacherKeys.update,
    mutationFn: (dto: TeacherDto) => teacherService.update(id, dto),
    ...options,
  })
}

export const useTeacherDeleteMutation = (
  options?: MutationOptions<string, Error, string>
) => {
  return useMutation({
    mutationKey: teacherKeys.delete,
    mutationFn: (id: string) => teacherService.delete(id),
    ...options,
  })
}
