import { fetchAuth } from '../fetch'
import { PaginationResult, PaginatorQuery } from '../query.types'
import { StudentDto, StudentResponse, UserResponse } from './user.types'

class UserService {
  async getProfile(accessToken?: string) {
    return fetchAuth.get<UserResponse>('users/profile', {
      headers: accessToken
        ? {
            Authorization: `Bearer ${accessToken}`,
          }
        : {},
    })
  }

  async getStudentsByQuery(query?: PaginatorQuery) {
    return fetchAuth.get<PaginationResult<StudentResponse>>('users/students', {
      params: query,
    })
  }

  async createStudent(dto: StudentDto) {
    return fetchAuth.post<string>('users/students', dto)
  }

  async updateStudent(id: string, dto: StudentDto) {
    return fetchAuth.put<string>(`users/students/${id}`, dto)
  }

  async deleteStudent(id: string) {
    return fetchAuth.delete<string>(`users/students/${id}`)
  }
}

export const userService = new UserService()
