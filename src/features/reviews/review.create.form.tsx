import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from '@tanstack/react-query'
import { reviewKeys, useCreateReviewMutation } from 'entities/reviews'
import { Star } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useForm } from 'react-hook-form'
import { ReviewDto, errorCatch, reviewFormSchema } from 'shared/api'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  InputWithLeadingIcon,
  LoadingButton,
  Textarea,
} from 'shared/ui'
import { toast } from 'sonner'

interface IProps {
  subjectId: string
  onSuccess?: () => void
}

export const ReviewCreateForm = ({ subjectId, onSuccess }: IProps) => {
  const form = useForm<ReviewDto>({
    defaultValues: {
      comment: '',
      score: '',
    },
    resolver: zodResolver(reviewFormSchema),
  })
  const t = useTranslations()
  const queryClient = useQueryClient()
  const { mutate, isPending } = useCreateReviewMutation(subjectId, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: reviewKeys.student })
      toast.success(t('actions.createSuccess'))
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
    mutate({
      score: +data.score as any,
      comment: data.comment,
    })
  })

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="w-full">
        <FormField
          name="score"
          control={form.control}
          render={({ field }) => (
            <FormItem className="mb-2">
              <FormLabel>{t('form.scoreLabel')}</FormLabel>
              <FormControl>
                <InputWithLeadingIcon
                  icon={Star}
                  type="number"
                  min={1}
                  max={5}
                  placeholder={t('form.scoreLabel')}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="comment"
          control={form.control}
          render={({ field }) => (
            <FormItem className="mb-2">
              <FormLabel>{t('form.commentLabel')}</FormLabel>
              <FormControl>
                <Textarea
                  rows={4}
                  placeholder={t('form.commentLabel')}
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
