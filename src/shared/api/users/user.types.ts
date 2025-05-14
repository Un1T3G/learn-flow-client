import { GroupResponse } from '../groups'

export interface UserResponse {
  id: string
  firstName: string
  lastName: string
  role: UserRole
  groupId: string
}

export interface StudentResponse {
  id: string
  firstName: string
  lastName: string
  login: string
  password: string
  group: GroupResponse
}

export enum UserRole {
  ADMIN = 'ADMIN',
  STUDENT = 'STUDENT',
}

export interface StudentDto {
  firstName: string
  lastName: string
  login: string
  password: string
  groupId: string
}
