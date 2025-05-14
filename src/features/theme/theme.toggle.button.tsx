'use client'

import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { Button } from 'shared/ui'

interface IProps {
  className?: string
}

export const ThemeToggleButton = ({ className }: IProps) => {
  const theme = useTheme()

  const Icon = theme.theme === 'dark' ? Sun : Moon

  const handleOnClick = () => {
    theme.setTheme(theme.theme === 'dark' ? 'light' : 'dark')
  }

  return (
    <Button
      variant="outline"
      size="icon"
      className={className}
      onClick={handleOnClick}
    >
      <Icon />
    </Button>
  )
}
