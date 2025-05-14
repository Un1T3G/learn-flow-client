'use client'

import { GroupCreateForm } from 'features/groups'
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

export const GroupCreateModal = () => {
  const [open, setOpen] = useState(false)
  const t = useTranslations()

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus />
          {t('actions.createGroup')}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{t('titles.createGroup')}</DialogTitle>
        </DialogHeader>
        <GroupCreateForm onSuccess={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  )
}
