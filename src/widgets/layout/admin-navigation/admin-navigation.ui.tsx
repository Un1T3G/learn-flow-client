'use client'

import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from 'shared/lib'
import { Button } from 'shared/ui'
import { adminNavigationConfig } from './admin-navigation.config'

interface IProps {
  className?: string
}

export const AdminNavigation = ({ className }: IProps) => {
  const pathname = usePathname()
  const t = useTranslations()

  return (
    <div className={cn('flex flex-col space-y-2', className)}>
      {adminNavigationConfig.map((item) => {
        const Icon = item.icon

        return (
          <Button
            key={item.path}
            variant={pathname === item.path ? 'default' : 'secondary'}
            className="justify-start"
            asChild
          >
            <Link href={item.path}>
              <Icon />
              {t(item.title)}
            </Link>
          </Button>
        )
      })}
    </div>
  )
}
