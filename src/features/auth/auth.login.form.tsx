'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useAuthLoginMutation } from 'entities/auth'
import { IdCard, KeyRound, Mail } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import {
  AuthLoginDto,
  authLoginFormSchema,
  authTokenService,
  errorCatch,
  userService,
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
} from 'shared/ui'
import { toast } from 'sonner'

export const AuthLoginForm = () => {
  const form = useForm<AuthLoginDto>({
    defaultValues: {
      login: '',
      password: '',
    },
    resolver: zodResolver(authLoginFormSchema),
    mode: 'onSubmit',
  })
  const t = useTranslations()
  const router = useRouter()
  const { mutate, isPending } = useAuthLoginMutation({
    onSuccess: async (data) => {
      toast.success(t('auth.loginSuccess'))
      authTokenService.setTokens(data)
      const profile = await userService.getProfile()
      router.push(profile.role === 'STUDENT' ? '/dashboard' : '/manage')
    },
    onError: (error) => {
      toast.error(errorCatch(error))
    },
  })
  const onSubmit = form.handleSubmit((data: AuthLoginDto) => {
    mutate(data)
  })

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="w-full">
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
            <FormItem>
              <FormLabel>{t('form.passwordLabel')}</FormLabel>
              <FormControl>
                <InputWithLeadingIcon
                  icon={KeyRound}
                  type="password"
                  placeholder="********"
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
          {t('form.loginAction')}
        </LoadingButton>
      </form>
    </Form>
  )
}
