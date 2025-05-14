export interface AuthLoginDto {
  login: string
  password: string
}

export interface AuthRegisterDto extends AuthLoginDto {
  firstName: string
  lastName: string
  secret: string
}

export interface AuthGetNewTokensDto {
  refreshToken: string
}

export interface AuthResponse {
  refreshToken: string
  accessToken: string
}
