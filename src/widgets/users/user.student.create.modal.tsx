'use client'

import { UserStudentCreateForm } from 'features/users'
import { Plus } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useState } from 'react'
import { GroupResponse } from 'shared/api'
import {
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from 'shared/ui'

interface IProps {
  groups: GroupResponse[]
}

export const UserStudentCreateModal = ({ groups }: IProps) => {
  const [open, setOpen] = useState(false)
  const t = useTranslations()

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus />
          {t('actions.createStudent')}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{t('titles.createStudent')}</DialogTitle>
        </DialogHeader>
        <UserStudentCreateForm
          groups={groups}
          onSuccess={() => setOpen(false)}
        />
      </DialogContent>
    </Dialog>
  )
}
