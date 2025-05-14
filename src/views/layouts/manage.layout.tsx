'use client'

import { AuthLogoutButton } from 'features/auth'
import { LanguageSelect } from 'features/i18n'
import { ThemeToggleButton } from 'features/theme'
import { Menu } from 'lucide-react'

import { PropsWithChildren, useState } from 'react'
import { useBreakpoint } from 'shared/lib'
import { Button } from 'shared/ui'
import { AdminNavigation, Footer, MobileSheet } from 'widgets/layout'
import { UserCard } from 'widgets/users'

export const ManageLayout = ({ children }: PropsWithChildren) => {
  const isMobile = useBreakpoint('sm')
  const [open, setOpen] = useState(false)

  const handleOpen = () => {
    setOpen(true)
  }

  return (
    <>
      <div>
        {!isMobile && (
          <aside className="fixed top-0 bottom-0 left-0 w-[256px] p-4 border-r border-border">
            <div className="mb-4">
              <UserCard />
            </div>
            <AdminNavigation />
          </aside>
        )}

        <div className="pl-0 md:pl-[256px] flex flex-col min-h-screen">
          <header className="h-16 border-b border-border flex items-center justify-between md:justify-end space-x-2 px-4">
            {isMobile ? (
              <>
                <UserCard />
                <Button variant="outline" size="icon" onClick={handleOpen}>
                  <Menu />
                </Button>
              </>
            ) : (
              <>
                <ThemeToggleButton />
                <LanguageSelect />
                <AuthLogoutButton />
              </>
            )}
          </header>
          <div className="flex-1">{children}</div>
          <Footer />
        </div>
      </div>
      <MobileSheet open={open} onOpenChange={setOpen}>
        <div className="flex space-x-2">
          <ThemeToggleButton />
          <LanguageSelect />
        </div>
        <AdminNavigation className="flex-1" />
        <AuthLogoutButton />
      </MobileSheet>
    </>
  )
}
