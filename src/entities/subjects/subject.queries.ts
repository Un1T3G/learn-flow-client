import { useMutation, useQuery } from '@tanstack/react-query'
import {
  PaginationResult,
  PaginatorQuery,
  SubjectDto,
  SubjectResponse,
  subjectService,
} from 'shared/api'
import { MutationOptions, QueryOptions } from 'shared/types'

export const subjectKeys = {
  all: ['subjects'],
  create: ['subjects', 'create'],
  update: ['subjects', 'update'],
  delete: ['subjects', 'delete'],
}

export const useSubjectsQuery = (
  query?: PaginatorQuery,
  options?: QueryOptions<PaginationResult<SubjectResponse>>
) => {
  return useQuery({
    queryKey: [...subjectKeys.all, ...Object.values(query || {})],
    queryFn: () => subjectService.getAllByQuery(query),
    ...options,
  })
}

export const useSubjectCreateMutation = (
  options?: MutationOptions<string, Error, SubjectDto>
) => {
  return useMutation({
    mutationKey: subjectKeys.create,
    mutationFn: (dto: SubjectDto) => subjectService.create(dto),
    ...options,
  })
}

export const useSubjectUpdateMutation = (
  id: string,
  options?: MutationOptions<string, Error, SubjectDto>
) => {
  return useMutation({
    mutationKey: subjectKeys.update,
    mutationFn: (dto: SubjectDto) => subjectService.update(id, dto),
    ...options,
  })
}

export const useSubjectDeleteMutation = (
  options?: MutationOptions<string, Error, string>
) => {
  return useMutation({
    mutationKey: subjectKeys.delete,
    mutationFn: (id: string) => subjectService.delete(id),
    ...options,
  })
}
