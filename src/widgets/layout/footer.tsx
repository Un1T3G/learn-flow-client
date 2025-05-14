'use client'

import { Container } from 'shared/ui'

export const Footer = () => {
  return (
    <footer className="h-16 border-t border-border flex items-center">
      <Container className="text-center">
        <p className="text-sm text-muted-foreground">
          Все права защищены © {new Date().getFullYear()}
        </p>
      </Container>
    </footer>
  )
}
