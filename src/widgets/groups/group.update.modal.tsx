'use client'

import { GroupUpdateForm } from 'features/groups/group.update.form'
import { Pencil } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useState } from 'react'
import { GroupDto } from 'shared/api'
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
  initialValues: GroupDto
}

export const GroupUpdateModal = ({ id, initialValues }: IProps) => {
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
          <DialogTitle>{t('titles.updateGroup')}</DialogTitle>
        </DialogHeader>

        <GroupUpdateForm
          id={id}
          initialValues={initialValues}
          onSuccess={() => setOpen(false)}
        />
      </DialogContent>
    </Dialog>
  )
}
