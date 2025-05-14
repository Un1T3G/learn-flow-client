'use client'

import { SubjectCreateForm } from 'features/subjects'
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

export const SubjectCreateModal = () => {
  const [open, setOpen] = useState(false)
  const t = useTranslations()

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus />
          {t('actions.createSubject')}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{t('titles.createSubject')}</DialogTitle>
        </DialogHeader>
        <SubjectCreateForm onSuccess={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  )
}
