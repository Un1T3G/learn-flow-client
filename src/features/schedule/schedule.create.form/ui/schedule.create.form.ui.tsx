import { useScheduleCreateMutation } from 'entities/schedule'
import { displayFullName } from 'entities/teachers'
import { Trash } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { ReactNode } from 'react'
import { Control, useFieldArray, useForm } from 'react-hook-form'
import { SubjectResponse, TeacherResponse, errorCatch } from 'shared/api'
import { ScheduleWeekCreateDto } from 'shared/api/schedule'
import { FIRST_COLUMN_WEEKDAYS, SECOND_COLUMN_WEEKDAYS } from 'shared/constants'
import { Button, Card, CardHeader, CardTitle, Form } from 'shared/ui'
import { toast } from 'sonner'

interface IProps {
  groupId: string
  from: string
  subjects: SubjectResponse[]
  teachers: TeacherResponse[]
  renderScheduleItemCreateButton: (props: {
    subjects: SubjectResponse[]
    teachers: TeacherResponse[]
    onCreate: (props: {
      subjectId: string
      teacherId: string
      time: string
    }) => void
  }) => ReactNode
}

const COLUMNS = [FIRST_COLUMN_WEEKDAYS, SECOND_COLUMN_WEEKDAYS]

export const ScheduleCreateForm = ({
  groupId,
  from,
  subjects,
  teachers,
  renderScheduleItemCreateButton,
}: IProps) => {
  const form = useForm<ScheduleWeekCreateDto>({
    defaultValues: {
      from,
      weekSchedule: {
        monday: [],
        tuesday: [],
        wednesday: [],
        thursday: [],
        friday: [],
        saturday: [],
      },
    },
  })

  const t = useTranslations()
  const { mutate } = useScheduleCreateMutation(groupId, {
    onSuccess: () => {
      toast.success(t('actions.createScheduleSuccess'))
    },
    onError: (error) => {
      toast.error(
        t.has(`serverErrors.${errorCatch(error)}`)
          ? t(`serverErrors.${errorCatch(error)}`)
          : errorCatch(error)
      )
    },
  })

  const onSubmit = form.handleSubmit((data) => {
    mutate({
      ...data,
      from,
    })
  })

  return (
    <Form {...form}>
      <form id="main-form" onSubmit={onSubmit} className="space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          {COLUMNS.map((column, i) => (
            <div key={i} className="flex-1 flex-col space-y-4">
              {column.map((day) => (
                <Card key={day}>
                  <CardHeader className="mb-2">
                    <CardTitle>{t(`weekdays.${day}`)}</CardTitle>
                  </CardHeader>
                  <DaySchedules
                    name={`weekSchedule.${day}`}
                    control={form.control}
                    subjects={subjects}
                    teachers={teachers}
                    renderScheduleItemCreateButton={
                      renderScheduleItemCreateButton
                    }
                  />
                </Card>
              ))}
            </div>
          ))}
        </div>
        <Button type="submit">{t('actions.createSchedule')}</Button>
      </form>
    </Form>
  )
}

interface IDaySchedulesProps {
  name: string
  control: Control<ScheduleWeekCreateDto, any, ScheduleWeekCreateDto>
  teachers: TeacherResponse[]
  subjects: SubjectResponse[]
  renderScheduleItemCreateButton: (props: {
    subjects: SubjectResponse[]
    teachers: TeacherResponse[]
    onCreate: (props: {
      subjectId: string
      teacherId: string
      time: string
    }) => void
  }) => ReactNode
}

const DaySchedules = ({
  name,
  control,
  teachers,
  subjects,
  renderScheduleItemCreateButton,
}: IDaySchedulesProps) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: name as any,
  })

  return (
    <div className="space-y-2 px-4">
      {fields.map((field, i) => (
        <Card key={i} className="flex-1 flex-row p-0">
          <span className="flex items-center px-4 border-r border-border font-medium">
            {i + 1}
          </span>
          <div className="flex-1 flex flex-col px-2">
            <span className="text-base font-medium">
              {subjects.find((s) => s.id === (field as any).subjectId)?.name}
            </span>
            <span className="text-sm">
              {displayFullName(
                teachers.find((t) => t.id === (field as any).teacherId)!
              )}
            </span>
          </div>
          <div className="flex items-center mr-2">
            <Button size="icon" variant="destructive" onClick={() => remove(i)}>
              <Trash />
            </Button>
          </div>
        </Card>
      ))}
      {renderScheduleItemCreateButton({
        subjects,
        teachers,
        onCreate: ({ subjectId, teacherId, time }) => {
          append({ subjectId, teacherId, time })
        },
      })}
    </div>
  )
}
