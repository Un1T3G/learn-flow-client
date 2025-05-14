'use client'

import { ScheduleAvailableWeekSelect } from 'features/schedule'
import { ScheduleCreateForm } from 'features/schedule/schedule.create.form'
import { useTranslations } from 'next-intl'
import { useState } from 'react'
import { GroupResponse, SubjectResponse, TeacherResponse } from 'shared/api'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from 'shared/ui'
import { ScheduleItemCreateModal } from 'widgets/schedule'

interface IProps {
  groups: GroupResponse[]
  subjects: SubjectResponse[]
  teachers: TeacherResponse[]
}

export const ManageScheduleCreate = ({
  groups,
  subjects,
  teachers,
}: IProps) => {
  const t = useTranslations()
  const [groupId, setGroupId] = useState(groups.length > 0 ? groups[0].id : '')
  const [date, setDate] = useState('')

  const hasGroups = groups.length > 0

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">
          {t('navigation.manageScheduleCreate')}
        </h1>
        {hasGroups && (
          <div className="flex gap-2">
            <ScheduleAvailableWeekSelect
              currentDate={new Date().toDateString()}
              date={date}
              setDate={setDate}
            />
            <Select value={groupId} onValueChange={setGroupId}>
              <SelectTrigger className="w-[240px]">
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
          </div>
        )}
      </div>

      {hasGroups && (
        <ScheduleCreateForm
          from={date}
          groupId={groupId}
          subjects={subjects}
          teachers={teachers}
          renderScheduleItemCreateButton={(props) => (
            <ScheduleItemCreateModal {...props} />
          )}
        />
      )}
    </div>
  )
}
