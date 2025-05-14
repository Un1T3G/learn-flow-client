'use client'

import { ScheduleItemCreateForm } from 'features/schedule'
import { Plus } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useState } from 'react'
import { SubjectResponse, TeacherResponse } from 'shared/api'
import {
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from 'shared/ui'

interface IProps {
  subjects: SubjectResponse[]
  teachers: TeacherResponse[]
  onCreate: (props: {
    subjectId: string
    teacherId: string
    time: string
  }) => void
}

export const ScheduleItemCreateModal = ({
  subjects,
  teachers,
  onCreate,
}: IProps) => {
  const [open, setOpen] = useState(false)
  const t = useTranslations()

  const handleOnCreate = (props: {
    subjectId: string
    teacherId: string
    time: string
  }) => {
    onCreate(props)
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full">
          <Plus />
          {t('actions.createSubject')}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{t('titles.createSubject')}</DialogTitle>
        </DialogHeader>
        <ScheduleItemCreateForm
          subjects={subjects}
          teachers={teachers}
          onCreate={handleOnCreate}
        />
      </DialogContent>
    </Dialog>
  )
}
