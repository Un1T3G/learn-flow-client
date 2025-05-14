import { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin('./src/entities/i18n/i18n.model.ts')

const config: NextConfig = {
  reactStrictMode: process.env.NODE_ENV === 'development',
  env: {
    SERVER_URL: process.env.SERVER_URL,
  },
}

export default withNextIntl(config)
