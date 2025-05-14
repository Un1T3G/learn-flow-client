import { TeacherResponse } from 'shared/api'

export const displayFullName = (teacher: TeacherResponse) =>
  `${teacher.firstName.at(0)}.${teacher.lastName}`
