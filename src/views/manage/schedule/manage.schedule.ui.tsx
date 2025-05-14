'use client'

import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { useState } from 'react'
import { GroupResponse } from 'shared/api'
import {
  Button,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from 'shared/ui'
import { ScheduleWeeksDataTable } from 'widgets/schedule'

interface IProps {
  groups: GroupResponse[]
}

export const ManageSchedulePage = ({ groups }: IProps) => {
  const t = useTranslations()
  const [groupId, setGroupId] = useState(groups.length > 0 ? groups[0].id : '')

  const hasGroups = groups.length > 0

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">{t('navigation.manageSchedule')}</h1>
        <Button asChild>
          <Link href="/manage/schedule/create">
            {t('schedule.addSchedule')}
          </Link>
        </Button>
      </div>
      {hasGroups && (
        <>
          <Select value={groupId} onValueChange={setGroupId}>
            <SelectTrigger className="w-[240px] mb-4">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {groups.map((group) => (
                <SelectItem value={group.id} key={group.id}>
                  {group.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <ScheduleWeeksDataTable groupId={groupId} />
        </>
      )}
    </div>
  )
}
