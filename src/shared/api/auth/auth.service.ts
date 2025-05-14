import { fetchClassic } from '../fetch'
import {
  AuthGetNewTokensDto,
  AuthLoginDto,
  AuthRegisterDto,
  AuthResponse,
} from './auth.types'

class AuthService {
  async login(dto: AuthLoginDto) {
    return fetchClassic.post<AuthResponse>('auth/login', dto)
  }

  async getNewTokens(dto: AuthGetNewTokensDto) {
    return fetchClassic.post<AuthResponse>('auth/login/refresh-token', dto)
  }

  async register(dto: AuthRegisterDto) {
    return fetchClassic.post<AuthResponse>('auth/register', dto)
  }
}

export const authService = new AuthService()
