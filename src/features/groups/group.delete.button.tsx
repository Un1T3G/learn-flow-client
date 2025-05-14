import { useQueryClient } from '@tanstack/react-query'
import { groupKeys, useGroupDeleteMutation } from 'entities/groups'
import { useTranslations } from 'next-intl'
import { errorCatch } from 'shared/api'
import { LoadingButton } from 'shared/ui'
import { toast } from 'sonner'

interface IProps {
  id: string
  onSuccess?: () => void
}

export const GroupDeleteButton = ({ id, onSuccess }: IProps) => {
  const t = useTranslations()
  const queryClient = useQueryClient()
  const { mutate, isPending } = useGroupDeleteMutation({
    onSuccess: () => {
      toast.success(t('actions.deleteSuccess'))
      queryClient.invalidateQueries({ queryKey: groupKeys.all })
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
