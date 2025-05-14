import { fetchAuth } from '../fetch'
import { PaginationResult, PaginatorQuery } from '../query.types'
import { TeacherDto, TeacherResponse } from './teacher.types'

class TeacherService {
  getAll(accessToken?: string) {
    return fetchAuth.get<TeacherResponse[]>('teachers/all', {
      headers: accessToken
        ? {
            Authorization: `Bearer ${accessToken}`,
          }
        : {},
    })
  }

  getAllByQuery(query?: PaginatorQuery) {
    return fetchAuth.get<PaginationResult<TeacherResponse>>('teachers', {
      params: query,
    })
  }

  create(dto: TeacherDto) {
    return fetchAuth.post<string>('teachers', dto)
  }

  update(id: string, dto: TeacherDto) {
    return fetchAuth.put<string>(`teachers/${id}`, dto)
  }

  delete(id: string) {
    return fetchAuth.delete<string>(`teachers/${id}`)
  }
}

export const teacherService = new TeacherService()
