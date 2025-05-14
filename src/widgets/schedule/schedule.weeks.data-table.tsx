'use client'

import { useScheduleWeeksQuery } from 'entities/schedule'
import { Link2 } from 'lucide-react'
import Link from 'next/link'
import { Button, DataTable, ErrorCard, TableCell, TableRow } from 'shared/ui'

interface IProps {
  groupId: string
}

const itemsPerPage = 10
const headers = ['N#', 'От', 'До', 'Действия']

export const ScheduleWeeksDataTable = ({ groupId }: IProps) => {
  const { data, isLoading, isError, error } = useScheduleWeeksQuery(groupId)

  if (isError) {
    return <ErrorCard error={error} />
  }

  return (
    <DataTable
      data={{
        data: data || [],
        meta: { total: data?.length || 0, prev: null, next: null },
      }}
      headers={headers}
      isError={isError}
      isLoading={isLoading}
      error={error}
      skeletonItemLength={itemsPerPage}
      fetchNext={() => {}}
      fetchPrev={() => {}}
      renderRow={(item, index) => (
        <TableRow key={index}>
          <TableCell>{index + 1}</TableCell>
          <TableCell>{item.from}</TableCell>
          <TableCell>{item.to}</TableCell>
          <TableCell className="flex justify-end space-x-2">
            <Button size="icon" asChild>
              <Link
                href={`/manage/schedule/week/${groupId}?from=${item.from}&to=${item.to}`}
              >
                <Link2 />
              </Link>
            </Button>
          </TableCell>
        </TableRow>
      )}
    />
  )
}
