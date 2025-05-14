import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from '@tanstack/react-query'
import { subjectKeys, useSubjectUpdateMutation } from 'entities/subjects'
import { Book } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useForm } from 'react-hook-form'
import { SubjectDto, errorCatch, subjectFormSchema } from 'shared/api'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  InputWithLeadingIcon,
  LoadingButton,
} from 'shared/ui'
import { toast } from 'sonner'

interface IProps {
  id: string
  initialValues: SubjectDto
  onSuccess?: () => void
}

export const SubjectUpdateForm = ({ id, initialValues, onSuccess }: IProps) => {
  const form = useForm<SubjectDto>({
    defaultValues: initialValues,
    resolver: zodResolver(subjectFormSchema),
    mode: 'onSubmit',
  })
  const t = useTranslations()
  const queryClient = useQueryClient()
  const { mutate, isPending } = useSubjectUpdateMutation(id, {
    onSuccess: () => {
      toast.success(t('subject.updateSuccess'))
      queryClient.invalidateQueries({ queryKey: subjectKeys.all })
      onSuccess?.()
    },
    onError: (error) => {
      const errorMessage = errorCatch(error)
      toast.error(
        t.has(`serverErrors.${errorMessage}`)
          ? t(`serverErrors.${errorMessage}`)
          : errorMessage
      )
    },
  })

  const onSubmit = form.handleSubmit((data: SubjectDto) => {
    mutate(data)
  })

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="w-full">
        <FormField
          name="name"
          control={form.control}
          render={({ field }) => (
            <FormItem className="mb-2">
              <FormLabel>{t('form.nameLabel')}</FormLabel>
              <FormControl>
                <InputWithLeadingIcon
                  icon={Book}
                  placeholder={t('form.nameLabel')}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <LoadingButton
          loading={isPending}
          type="submit"
          className="w-full mt-4"
        >
          {t('form.saveAction')}
        </LoadingButton>
      </form>
    </Form>
  )
}
