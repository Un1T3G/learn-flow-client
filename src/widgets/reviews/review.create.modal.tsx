'use client'

import { ReviewCreateForm } from 'features/reviews'
import { Loader2, Star } from 'lucide-react'
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

interface IProps {
  subjectId: string
  disabled: boolean
  loading: boolean
  className?: string
}

export const ReviewCreateModal = ({
  subjectId,
  disabled,
  loading,
  className,
}: IProps) => {
  const [open, setOpen] = useState(false)
  const t = useTranslations()

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          size="icon"
          disabled={disabled || loading}
          className={className}
        >
          {loading ? <Loader2 className="animate-spin" /> : <Star />}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{t('titles.createReview')}</DialogTitle>
        </DialogHeader>
        <ReviewCreateForm
          subjectId={subjectId}
          onSuccess={() => setOpen(false)}
        />
      </DialogContent>
    </Dialog>
  )
}
