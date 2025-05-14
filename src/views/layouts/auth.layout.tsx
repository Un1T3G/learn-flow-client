'use client'

import { LanguageSelect } from 'features/i18n'
import { ThemeToggleButton } from 'features/theme'

import { PropsWithChildren } from 'react'
import { Container } from 'shared/ui'
import { Footer } from 'widgets/layout'

export const AuthLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="h-16 border-b border-border flex items-center">
        <Container className="flex items-center justify-end space-x-2">
          <ThemeToggleButton />
          <LanguageSelect />
        </Container>
      </header>
      {children}
      <Footer />
    </div>
  )
}
