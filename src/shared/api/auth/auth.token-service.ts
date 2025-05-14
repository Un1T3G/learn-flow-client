import Cookies from 'js-cookie'
import { AuthResponse } from './auth.types'

export const ACCESS_TOKEN_KEY = 'access_token'
export const REFRESH_TOKEN_KEY = 'refresh_token'

class AuthTokenService {
  getAccessToken() {
    return Cookies.get(ACCESS_TOKEN_KEY)
  }

  getRefreshToken() {
    return Cookies.get(REFRESH_TOKEN_KEY)
  }

  setTokens(tokens: AuthResponse) {
    Cookies.set(ACCESS_TOKEN_KEY, tokens.accessToken)
    Cookies.set(REFRESH_TOKEN_KEY, tokens.refreshToken)
  }

  removeTokens() {
    Cookies.remove(ACCESS_TOKEN_KEY)
    Cookies.remove(REFRESH_TOKEN_KEY)
  }
}

export const authTokenService = new AuthTokenService()
