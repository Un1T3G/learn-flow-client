'use client'

import { ScheduleWeekResponse } from 'shared/api'
import { ScheduleGrid } from 'widgets/schedule'

interface IProps {
  schedule: ScheduleWeekResponse
}

export const ManageScheduleManageWeekPage = ({ schedule }: IProps) => {
  return (
    <div className="p-4">
      <ScheduleGrid schedule={schedule} />
    </div>
  )
}
