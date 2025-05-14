'use client'

import { useStudentsQuery } from 'entities/users/user.queries'
import { ReactNode } from 'react'
import { GroupResponse, StudentDto } from 'shared/api'
import { usePagePaginate } from 'shared/lib'
import { DataTable, TableCell, TableRow } from 'shared/ui'

interface IProps {
  groups: GroupResponse[]
  renderDeleteButton: (id: string, groups: GroupResponse[]) => ReactNode
  renderUpdateButton: (
    id: string,
    initialValues: StudentDto,
    groups: GroupResponse[]
  ) => ReactNode
}

const itemsPerPage = 10
const headers = ['N#', 'ФИО', 'Действия']

export const UserStudentDataTable = ({
  groups,
  renderDeleteButton,
  renderUpdateButton,
}: IProps) => {
  const { page, fetchNext, fetchPrev } = usePagePaginate()
  const { data, isLoading, isError, error } = useStudentsQuery({
    page,
    perPage: itemsPerPage,
  })

  return (
    <DataTable
      data={data!}
      headers={headers}
      isError={isError}
      isLoading={isLoading}
      error={error}
      skeletonItemLength={itemsPerPage}
      fetchNext={fetchNext}
      fetchPrev={fetchPrev}
      renderRow={(item, index) => (
        <TableRow key={item.id}>
          <TableCell>{index + 1 + (page - 1) * itemsPerPage}</TableCell>
          <TableCell>{`${item.firstName.at(0) || ''}.${
            item.lastName
          }`}</TableCell>
          <TableCell className="flex justify-end space-x-2">
            {renderUpdateButton(item.id, item as any, groups)}
            {renderDeleteButton(item.id, groups)}
          </TableCell>
        </TableRow>
      )}
    />
  )
}
