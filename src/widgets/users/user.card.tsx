'use client'

import { useUserProfileQuery } from 'entities/users/user.queries'
import { ErrorCard, Skeleton } from 'shared/ui'

export const UserCard = () => {
  const { data: user, isLoading, isError, error } = useUserProfileQuery()

  if (isError) {
    return <ErrorCard error={error} />
  }

  if (isLoading) {
    return <Skeleton className="w-full h-8 rounded-lg" />
  }

  const shortFullName = user!.firstName.slice(0, 1) + '.' + user!.lastName

  return (
    <div className="flex items-center space-x-2">
      <div className="w-8 h-8 rounded-full bg-border" />
      <span className="text-sm font-medium">{shortFullName}</span>
    </div>
  )
}
