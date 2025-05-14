import { fetchAuth } from '../fetch'
import { PaginationResult, PaginatorQuery } from '../query.types'
import { SubjectDto, SubjectResponse } from './subject.types'

class SubjectService {
  getAll(accessToken?: string) {
    return fetchAuth.get<SubjectResponse[]>('subjects/all', {
      headers: accessToken
        ? {
            Authorization: `Bearer ${accessToken}`,
          }
        : {},
    })
  }

  getAllByQuery(query?: PaginatorQuery) {
    return fetchAuth.get<PaginationResult<SubjectResponse>>('subjects', {
      params: query,
    })
  }

  create(dto: SubjectDto) {
    return fetchAuth.post<string>('subjects', dto)
  }

  update(id: string, dto: SubjectDto) {
    return fetchAuth.put<string>(`subjects/${id}`, dto)
  }

  delete(id: string) {
    return fetchAuth.delete<string>(`subjects/${id}`)
  }
}

export const subjectService = new SubjectService()
