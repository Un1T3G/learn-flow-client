import { useQueryClient } from '@tanstack/react-query'
import { teacherKeys, useTeacherDeleteMutation } from 'entities/teachers'
import { useTranslations } from 'next-intl'
import { errorCatch } from 'shared/api'
import { LoadingButton } from 'shared/ui'
import { toast } from 'sonner'

interface IProps {
  id: string
  onSuccess?: () => void
}

export const TeacherDeleteButton = ({ id, onSuccess }: IProps) => {
  const t = useTranslations()
  const queryClient = useQueryClient()
  const { mutate, isPending } = useTeacherDeleteMutation({
    onSuccess: () => {
      toast.success(t('actions.deleteSuccess'))
      queryClient.invalidateQueries({ queryKey: teacherKeys.all })
      onSuccess?.()
    },
    onError: (error) => {
      toast.error(
        t.has(`serverErrors.${errorCatch(error)}`)
          ? t(`serverErrors.${errorCatch(error)}`)
          : errorCatch(error)
      )
    },
  })

  const handleDelete = () => {
    mutate(id)
  }

  return (
    <LoadingButton loading={isPending} onClick={handleDelete}>
      {t('actions.delete')}
    </LoadingButton>
  )
}
