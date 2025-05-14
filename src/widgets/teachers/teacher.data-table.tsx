'use client'

import { useTeachersQuery } from 'entities/teachers'
import { ReactNode } from 'react'
import { TeacherDto } from 'shared/api'
import { usePagePaginate } from 'shared/lib'
import { DataTable, TableCell, TableRow } from 'shared/ui'

interface IProps {
  renderDeleteButton: (id: string) => ReactNode
  renderUpdateButton: (id: string, initialValues: TeacherDto) => ReactNode
}

const itemsPerPage = 10
const headers = ['N#', 'ФИО', 'Действия']

export const TeacherDataTable = ({
  renderDeleteButton,
  renderUpdateButton,
}: IProps) => {
  const { page, fetchNext, fetchPrev } = usePagePaginate()
  const { data, isLoading, isError, error } = useTeachersQuery({
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
            {renderUpdateButton(item.id, item)}
            {renderDeleteButton(item.id)}
          </TableCell>
        </TableRow>
      )}
    />
  )
}
