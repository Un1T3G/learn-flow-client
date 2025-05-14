import { useMutation } from '@tanstack/react-query'
import {
  AuthLoginDto,
  AuthRegisterDto,
  AuthResponse,
  authService,
} from 'shared/api'
import { MutationOptions } from 'shared/types'

export const authKeys = {
  login: ['auth', 'login'],
  register: ['auth', 'register'],
}

export const useAuthLoginMutation = (
  options?: MutationOptions<AuthResponse, Error, AuthLoginDto>
) => {
  return useMutation({
    mutationKey: authKeys.login,
    mutationFn: (dto: AuthLoginDto) => authService.login(dto),
    ...options,
  })
}

export const useAuthRegisterMutation = (
  options?: MutationOptions<AuthResponse, Error, AuthRegisterDto>
) => {
  return useMutation({
    mutationKey: authKeys.register,
    mutationFn: (dto: AuthRegisterDto) => authService.register(dto),
    ...options,
  })
}
