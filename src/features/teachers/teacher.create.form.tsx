import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from '@tanstack/react-query'
import { teacherKeys, useTeacherCreateMutation } from 'entities/teachers'
import { User } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useForm } from 'react-hook-form'
import { TeacherDto, errorCatch, teacherFormSchema } from 'shared/api'

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
  onSuccess?: () => void
}

export const TeacherCreateForm = ({ onSuccess }: IProps) => {
  const form = useForm<TeacherDto>({
    defaultValues: {
      firstName: '',
      lastName: '',
    },
    resolver: zodResolver(teacherFormSchema),
    mode: 'onSubmit',
  })
  const t = useTranslations()
  const queryClient = useQueryClient()
  const { mutate, isPending } = useTeacherCreateMutation({
    onSuccess: () => {
      toast.success(t('actions.createSuccess'))
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

  const onSubmit = form.handleSubmit((data) => {
    mutate(data)
  })

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="w-full">
        <FormField
          name="firstName"
          control={form.control}
          render={({ field }) => (
            <FormItem className="mb-2">
              <FormLabel>{t('form.firstNameLabel')}</FormLabel>
              <FormControl>
                <InputWithLeadingIcon
                  icon={User}
                  placeholder={t('form.firstNameLabel')}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="lastName"
          control={form.control}
          render={({ field }) => (
            <FormItem className="mb-2">
              <FormLabel>{t('form.lastNameLabel')}</FormLabel>
              <FormControl>
                <InputWithLeadingIcon
                  icon={User}
                  placeholder={t('form.lastNameLabel')}
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
          {t('form.createAction')}
        </LoadingButton>
      </form>
    </Form>
  )
}
