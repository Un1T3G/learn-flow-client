'use client'

import { SubjectUpdateForm } from 'features/subjects'
import { Pencil } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useState } from 'react'
import { SubjectDto } from 'shared/api'
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
  initialValues: SubjectDto
}

export const SubjectUpdateModal = ({ id, initialValues }: IProps) => {
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
          <DialogTitle>{t('titles.updateSubject')}</DialogTitle>
        </DialogHeader>

        <SubjectUpdateForm
          id={id}
          initialValues={initialValues}
          onSuccess={() => setOpen(false)}
        />
      </DialogContent>
    </Dialog>
  )
}
