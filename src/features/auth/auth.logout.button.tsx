'use client'

import { useSessionStore } from 'entities/session'
import { LogOut } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import { authTokenService } from 'shared/api'
import { Button } from 'shared/ui'
import { toast } from 'sonner'

export const AuthLogoutButton = () => {
  const setIsAuth = useSessionStore((state) => state.setIsAuth)
  const router = useRouter()
  const t = useTranslations()

  const logout = () => {
    setIsAuth(false)
    authTokenService.removeTokens()
    toast.success(t('auth.logoutSuccess'))
    router.push('/auth/login')
  }

  return (
    <Button onClick={logout} variant="destructive">
      <LogOut />
      {t('auth.logoutAction')}
    </Button>
  )
}
