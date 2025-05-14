'use client'

import { setUserLocale } from 'entities/i18n'
import { useLocale, useTranslations } from 'next-intl'
import { Locale, locales } from 'shared/config'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from 'shared/ui'

export const LanguageSelect = () => {
  const t = useTranslations()
  const locale = useLocale()

  const handleChangeLocale = async (locale: Locale) => {
    await setUserLocale(locale)
  }

  return (
    <Select value={locale as Locale} onValueChange={handleChangeLocale}>
      <SelectTrigger className="w-[180px]">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {locales.map((locale) => (
          <SelectItem key={locale} value={locale}>
            {t(`languages.${locale}`)}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
