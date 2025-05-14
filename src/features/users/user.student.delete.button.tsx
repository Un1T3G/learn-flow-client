import { useQueryClient } from '@tanstack/react-query'
import { useDeleteStudentMutation, userKeys } from 'entities/users/user.queries'
import { useTranslations } from 'next-intl'
import { errorCatch } from 'shared/api'
import { LoadingButton } from 'shared/ui'
import { toast } from 'sonner'

interface IProps {
  id: string
  onSuccess?: () => void
}

export const UserStudentDeleteButton = ({ id, onSuccess }: IProps) => {
  const t = useTranslations()
  const queryClient = useQueryClient()
  const { mutate, isPending } = useDeleteStudentMutation({
    onSuccess: () => {
      toast.success(t('actions.deleteSuccess'))
      queryClient.invalidateQueries({ queryKey: userKeys.students })
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
