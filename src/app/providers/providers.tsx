import { NextIntlClientProvider } from 'next-intl'
import { PropsWithChildren } from 'react'
import { Toaster } from 'shared/ui'
import { ReactQueryProvider } from './react-query.provider'
import { SessionProvider } from './session.provider'
import { ThemeProvider } from './theme.provider'

export const Providers = ({ children }: PropsWithChildren) => {
  return (
    <NextIntlClientProvider>
      <ReactQueryProvider>
        <SessionProvider>
          <ThemeProvider>
            {children}
            <Toaster />
          </ThemeProvider>
        </SessionProvider>
      </ReactQueryProvider>
    </NextIntlClientProvider>
  )
}
