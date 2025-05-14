export type Locale = (typeof locales)[number]

export const locales = ['ru', 'qq', 'uz'] as const
export const defaultLocale: Locale = 'ru'
