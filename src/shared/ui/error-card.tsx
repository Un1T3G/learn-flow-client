import { cn } from 'shared/lib'
import { Card } from './card'

interface IProps {
  error?: Error | null
  className?: string
}

export const ErrorCard = ({ error, className }: IProps) => {
  return (
    <Card className={cn('p-4', className)}>
      <p className="text-sm text-red-500">{error?.message}</p>
    </Card>
  )
}
