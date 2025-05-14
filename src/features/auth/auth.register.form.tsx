'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useAuthRegisterMutation } from 'entities/auth'
import { IdCard, KeyRound, User } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import {
  AuthRegisterDto,
  authRegisterFormSchema,
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

export const AuthRegisterForm = () => {
  const form = useForm<AuthRegisterDto>({
    defaultValues: {
      login: '',
      password: '',
      firstName: '',
      lastName: '',
      secret: '',
    },
    resolver: zodResolver(authRegisterFormSchema),
    mode: 'onSubmit',
  })
  const t = useTranslations()
  const router = useRouter()
  const { mutate, isPending } = useAuthRegisterMutation({
    onSuccess: async (data) => {
      toast.success(t('auth.registerSuccess'))
      authTokenService.setTokens(data)
      const profile = await userService.getProfile()
      router.push(profile.role === 'STUDENT' ? '/dashboard' : '/manage')
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

  const onSubmit = form.handleSubmit((data: AuthRegisterDto) => {
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
        <FormField
          name="secret"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('form.secretCodeLabel')}</FormLabel>
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
          {t('form.registerAction')}
        </LoadingButton>
      </form>
    </Form>
  )
}
