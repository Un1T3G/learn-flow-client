import { fetchAuth } from '../fetch'
import { PaginationResult, PaginatorQuery } from '../query.types'
import { GroupDto, GroupResponse } from './group.types'

class GroupService {
  getAll(accessToken?: string) {
    return fetchAuth.get<GroupResponse[]>('groups/all', {
      headers: accessToken
        ? {
            Authorization: `Bearer ${accessToken}`,
          }
        : {},
    })
  }

  getAllByQuery(query?: PaginatorQuery) {
    return fetchAuth.get<PaginationResult<GroupResponse>>('groups', {
      params: query,
    })
  }

  create(dto: GroupDto) {
    return fetchAuth.post<string>('groups', dto)
  }

  update(id: string, dto: GroupDto) {
    return fetchAuth.put<string>(`groups/${id}`, dto)
  }

  delete(id: string) {
    return fetchAuth.delete<string>(`groups/${id}`)
  }
}

export const groupService = new GroupService()
