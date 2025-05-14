import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from '@tanstack/react-query'
import { groupKeys, useGroupUpdateMutation } from 'entities/groups'
import { Link, Users } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useForm } from 'react-hook-form'
import { GroupDto, errorCatch, groupFormSchema } from 'shared/api'
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
  initialValues: GroupDto
  onSuccess?: () => void
}

export const GroupUpdateForm = ({ id, initialValues, onSuccess }: IProps) => {
  const form = useForm<GroupDto>({
    defaultValues: initialValues,
    resolver: zodResolver(groupFormSchema),
    mode: 'onSubmit',
  })
  const t = useTranslations()
  const queryClient = useQueryClient()
  const { mutate, isPending } = useGroupUpdateMutation(id, {
    onSuccess: () => {
      toast.success(t('actions.saveSuccess'))
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

  const onSubmit = form.handleSubmit((data) => {
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
                  icon={Users}
                  placeholder={t('form.nameLabel')}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="slug"
          control={form.control}
          render={({ field }) => (
            <FormItem className="mb-2">
              <FormLabel>{t('form.slugLabel')}</FormLabel>
              <FormControl>
                <InputWithLeadingIcon
                  icon={Link}
                  placeholder={t('form.slugLabel')}
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
