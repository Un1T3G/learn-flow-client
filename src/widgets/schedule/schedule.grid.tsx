import { displayFullName } from 'entities/teachers'
import { useTranslations } from 'next-intl'
import { ReactNode } from 'react'
import { ScheduleResponse, ScheduleWeekResponse } from 'shared/api/schedule'
import { FIRST_COLUMN_WEEKDAYS, SECOND_COLUMN_WEEKDAYS } from 'shared/constants'
import { Card, CardHeader, CardTitle } from 'shared/ui'

interface IProps {
  schedule: ScheduleWeekResponse
  renderScheduleItemAction?: (schedule: ScheduleResponse) => ReactNode
}

const COLUMNS = [FIRST_COLUMN_WEEKDAYS, SECOND_COLUMN_WEEKDAYS]

export const ScheduleGrid = ({
  schedule,
  renderScheduleItemAction,
}: IProps) => {
  const t = useTranslations()

  return (
    <div className="flex flex-col md:flex-row gap-4">
      {COLUMNS.map((column, i) => (
        <div key={i} className="flex-1 flex-col space-y-4">
          {column.map((day) => (
            <Card key={day} className="px-4">
              <CardHeader className="mb-2 px-0">
                <CardTitle>{t(`weekdays.${day}`)}</CardTitle>
              </CardHeader>
              <Schedules
                schedules={schedule[day as keyof ScheduleWeekResponse]}
                renderScheduleItemAction={renderScheduleItemAction}
              />
            </Card>
          ))}
        </div>
      ))}
    </div>
  )
}

const Schedules = ({
  schedules,
  renderScheduleItemAction,
}: {
  schedules: ScheduleResponse[]
  renderScheduleItemAction?: (schedule: ScheduleResponse) => ReactNode
}) => {
  const t = useTranslations()

  if (schedules.length === 0) {
    return (
      <div className="border border-border border-dashed rounded-lg h-32 w-full flex items-center justify-center">
        <span className="text-lg text-muted-foreground">
          {t('schedule.empty')}
        </span>
      </div>
    )
  }

  return (
    <div className="space-y-2">
      {schedules.map((item, i) => (
        <Card key={item.id} className="flex-1 flex-row p-0">
          <span className="flex items-center px-4 border-r border-border font-medium">
            {i + 1}
          </span>
          <div className="flex-1 flex flex-col justify-center px-2">
            <span className="text-base font-medium">{item.subject.name}</span>
            <span className="text-sm">{displayFullName(item.teacher)}</span>
          </div>
          {renderScheduleItemAction && renderScheduleItemAction(item)}
        </Card>
      ))}
    </div>
  )
}
