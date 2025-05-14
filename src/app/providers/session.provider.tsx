'use client'

import { useSessionStore } from 'entities/session'
import { useTranslations } from 'next-intl'
import { PropsWithChildren, useEffect } from 'react'
import { AuthEvents } from 'shared/api'
import { toast } from 'sonner'

export const SessionProvider = ({ children }: PropsWithChildren) => {
  const t = useTranslations()
  const setIsAuth = useSessionStore((state) => state.setIsAuth)

  useEffect(() => {
    const handleRefreshTokens = () => {
      toast.success(t('auth.refreshTokensSuccess'))
    }

    const handleTokensExpired = () => {
      toast.error(t('auth.tokensExpired'))
      setIsAuth(false)
    }

    const IS_CLIENT = typeof document !== 'undefined'
    if (!IS_CLIENT) {
      return
    }

    document.addEventListener(
      AuthEvents.onRefreshTokens.type,
      handleRefreshTokens
    )
    document.addEventListener(
      AuthEvents.onTokensExpired.type,
      handleTokensExpired
    )

    return () => {
      if (!IS_CLIENT) {
        return
      }

      document.removeEventListener(
        AuthEvents.onRefreshTokens.type,
        handleRefreshTokens
      )
      document.removeEventListener(
        AuthEvents.onTokensExpired.type,
        handleTokensExpired
      )
    }
  }, [])

  return <>{children}</>
}
