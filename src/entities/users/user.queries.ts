import { useMutation, useQuery } from '@tanstack/react-query'
import {
  PaginationResult,
  PaginatorQuery,
  StudentDto,
  StudentResponse,
  UserResponse,
  userService,
} from 'shared/api'
import { MutationOptions, QueryOptions } from 'shared/types'

export const userKeys = {
  profile: ['user', 'profile'],
  students: ['students'],
  createStudent: ['students', 'create'],
  updateStudent: ['students', 'update'],
  deleteStudent: ['students', 'delete'],
}

export const useUserProfileQuery = (options?: QueryOptions<UserResponse>) => {
  return useQuery({
    queryKey: userKeys.profile,
    queryFn: () => userService.getProfile(),
    ...options,
  })
}

export const useStudentsQuery = (
  query?: PaginatorQuery,
  options?: QueryOptions<PaginationResult<StudentResponse>>
) => {
  return useQuery({
    queryKey: userKeys.students,
    queryFn: () => userService.getStudentsByQuery(query),
    ...options,
  })
}

export const useCreateStudentMutation = (
  options?: MutationOptions<string, Error, StudentDto>
) => {
  return useMutation({
    mutationKey: userKeys.createStudent,
    mutationFn: (dto: StudentDto) => userService.createStudent(dto),
    ...options,
  })
}

export const useUpdateStudentMutation = (
  id: string,
  options?: MutationOptions<string, Error, StudentDto>
) => {
  return useMutation({
    mutationKey: userKeys.updateStudent,
    mutationFn: (dto: StudentDto) => userService.updateStudent(id, dto),
    ...options,
  })
}

export const useDeleteStudentMutation = (
  options?: MutationOptions<string, Error, string>
) => {
  return useMutation({
    mutationKey: userKeys.deleteStudent,
    mutationFn: (id: string) => userService.deleteStudent(id),
    ...options,
  })
}
