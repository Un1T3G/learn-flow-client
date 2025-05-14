import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from '@tanstack/react-query'
import { useUpdateStudentMutation, userKeys } from 'entities/users/user.queries'
import { IdCard, Lock, User } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useForm } from 'react-hook-form'
import {
  GroupResponse,
  StudentDto,
  errorCatch,
  userStudentFormSchema,
} from 'shared/api'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  InputWithLeadingIcon,
  LoadingButton,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from 'shared/ui'
import { toast } from 'sonner'

interface IProps {
  id: string
  initialValues: StudentDto
  groups: GroupResponse[]
  onSuccess?: () => void
}

export const UserStudentUpdateForm = ({
  id,
  initialValues,
  groups,
  onSuccess,
}: IProps) => {
  const form = useForm<StudentDto>({
    defaultValues: initialValues,
    resolver: zodResolver(userStudentFormSchema),
    mode: 'onSubmit',
  })
  const t = useTranslations()
  const queryClient = useQueryClient()
  const { mutate, isPending } = useUpdateStudentMutation(id, {
    onSuccess: () => {
      toast.success(t('actions.createSuccess'))
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
        <FormField
          name="login"
          control={form.control}
          render={({ field }) => (
            <FormItem className="mb-2">
              <FormLabel>{t('form.loginLabel')}</FormLabel>
              <FormControl>
                <InputWithLeadingIcon
                  icon={IdCard}
                  placeholder={t('form.loginLabel')}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="password"
          control={form.control}
          render={({ field }) => (
            <FormItem className="mb-2">
              <FormLabel>{t('form.passwordLabel')}</FormLabel>
              <FormControl>
                <InputWithLeadingIcon
                  icon={Lock}
                  placeholder={t('form.passwordLabel')}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="groupId"
          control={form.control}
          render={({ field }) => (
            <FormItem className="mb-2">
              <FormLabel>{t('form.loginLabel')}</FormLabel>
              <FormControl>
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder={t('form.groupPlaceholder')} />
                  </SelectTrigger>
                  <SelectContent>
                    {groups.map((group) => (
                      <SelectItem value={group.id} key={group.id}>
                        {group.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
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
