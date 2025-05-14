import {
  MutateOptions as ReactQueryMutateOptions,
  UseQueryOptions,
} from '@tanstack/react-query'

export type QueryOptions<T> = Omit<UseQueryOptions<T>, 'queryFn' | 'queryKey'>

export type MutationOptions<T, J, K> = Omit<
  ReactQueryMutateOptions<T, J, K>,
  'mutationFn' | 'mutationKey'
>
