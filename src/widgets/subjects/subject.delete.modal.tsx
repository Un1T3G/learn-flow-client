'use client'

import { SubjectDeleteButton } from 'features/subjects'
import { Trash } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useState } from 'react'
import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from 'shared/ui'

interface IProps {
  id: string
}

export const SubjectDeleteModal = ({ id }: IProps) => {
  const [open, setOpen] = useState(false)
  const t = useTranslations()

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="icon" variant="destructive">
          <Trash />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{t('actions.deleteConfirm')}</DialogTitle>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="secondary">{t('actions.cancel')}</Button>
          </DialogClose>
          <SubjectDeleteButton id={id} onSuccess={() => setOpen(false)} />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
