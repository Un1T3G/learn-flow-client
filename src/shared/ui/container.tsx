import { PropsWithChildren } from 'react'
import { cn } from 'shared/lib'

interface IProps extends PropsWithChildren {
  className?: string
}

export const Container = ({ className, children }: IProps) => {
  return (
    <div className={cn('w-full max-w-7xl px-4 mx-auto', className)}>
      {children}
    </div>
  )
}
