import { Providers } from 'app'
import 'app/styles/styles.css'
import type { Metadata } from 'next'
import { getLocale } from 'next-intl/server'
import { Roboto } from 'next/font/google'
import { NoSSR } from 'shared/lib'

const roboto = Roboto({
  variable: '--font-geist-sans',
  subsets: ['latin', 'cyrillic'],
})

export const metadata: Metadata = {
  title: 'Платформа оценок расписаний',
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const locale = await getLocale()

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={`${roboto.variable} antialiased`}>
        <Providers>
          <NoSSR>{children}</NoSSR>
        </Providers>
      </body>
    </html>
  )
}
