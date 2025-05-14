import { SubjectResponse } from '../subjects'
import { TeacherResponse } from '../teachers'

export interface ScheduleResponse {
  id: string
  subject: SubjectResponse
  teacher: TeacherResponse
}

export interface ScheduleWeekResponse {
  monday: ScheduleResponse[]
  tuesday: ScheduleResponse[]
  wednesday: ScheduleResponse[]
  thursday: ScheduleResponse[]
  friday: ScheduleResponse[]
  saturday: ScheduleResponse[]
}

export interface ScheduleCreateDto {
  subjectId: string
  teacherId: string
  time: string
}

export interface ScheduleWeekCreateDto {
  from: string
  weekSchedule: {
    monday: ScheduleCreateDto[]
    tuesday: ScheduleCreateDto[]
    wednesday: ScheduleCreateDto[]
    thursday: ScheduleCreateDto[]
    friday: ScheduleCreateDto[]
    saturday: ScheduleCreateDto[]
  }
}

export interface ScheduleUpdateDto {
  id: string
  subjectId: string
  teacherId: string
  time: string
}

export interface ScheduleWeekUpdateDto {
  weekSchedule: {
    monday: ScheduleUpdateDto[]
    tuesday: ScheduleUpdateDto[]
    wednesday: ScheduleUpdateDto[]
    thursday: ScheduleUpdateDto[]
    friday: ScheduleUpdateDto[]
    saturday: ScheduleUpdateDto[]
  }
}
