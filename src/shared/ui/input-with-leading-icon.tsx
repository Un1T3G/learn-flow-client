import { ComponentProps, forwardRef } from 'react'
import { cn } from 'shared/lib'
import { Input } from './input'

interface IProps extends ComponentProps<'input'> {
  icon: any
  inputClassName?: string
}

export const InputWithLeadingIcon = forwardRef<HTMLInputElement, IProps>(
  ({ icon, className, inputClassName, ...props }, ref) => {
    const Icon = icon

    return (
      <div className={cn('relative', className)}>
        <div className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground">
          <Icon className="h-4 w-4" />
        </div>
        <Input ref={ref} className={cn('pl-8', inputClassName)} {...props} />
      </div>
    )
  }
)
InputWithLeadingIcon.displayName = 'InputWithLeadingIcon'
