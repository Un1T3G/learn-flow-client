'use client'

import { TeacherCreateForm } from 'features/teachers'
import { Plus } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useState } from 'react'
import {
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from 'shared/ui'

export const TeacherCreateModal = () => {
  const [open, setOpen] = useState(false)
  const t = useTranslations()

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus />
          {t('actions.createTeacher')}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{t('titles.createTeacher')}</DialogTitle>
        </DialogHeader>
        <TeacherCreateForm onSuccess={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  )
}
