'use client'

import { TeacherUpdateForm } from 'features/teachers'
import { Pencil } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useState } from 'react'
import { TeacherDto } from 'shared/api'
import {
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from 'shared/ui'

interface IProps {
  id: string
  initialValues: TeacherDto
}

export const TeacherUpdateModal = ({ id, initialValues }: IProps) => {
  const [open, setOpen] = useState(false)
  const t = useTranslations()

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="icon">
          <Pencil />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{t('titles.updateTeacher')}</DialogTitle>
        </DialogHeader>

        <TeacherUpdateForm
          id={id}
          initialValues={initialValues}
          onSuccess={() => setOpen(false)}
        />
      </DialogContent>
    </Dialog>
  )
}
