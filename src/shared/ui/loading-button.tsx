import { Loader2 } from 'lucide-react'
import { cn } from 'shared/lib'
import { Button } from './button'

type ButtonProps = Parameters<typeof Button>[0]

interface IProps extends ButtonProps {
  loading?: boolean
}

export const LoadingButton = ({
  loading = false,
  disabled,
  children,
  className,
  ...restProps
}: IProps) => {
  return (
    <Button
      disabled={loading || disabled}
      className={cn('relative', className)}
      {...restProps}
    >
      {loading ? (
        <>
          <Loader2 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-spin" />
          <span className="opacity-0">{children}</span>
        </>
      ) : (
        children
      )}
    </Button>
  )
}
