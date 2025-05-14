import { PropsWithChildren } from 'react'
import { Sheet, SheetContent, SheetTitle } from 'shared/ui'

interface IProps extends PropsWithChildren {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export const MobileSheet = ({ open, onOpenChange, children }: IProps) => {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="flex flex-col p-4">
        <SheetTitle className="hidden">Навигация</SheetTitle>
        {children}
      </SheetContent>
    </Sheet>
  )
}
