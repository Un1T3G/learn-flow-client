import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import {
  ACCESS_TOKEN_KEY,
  groupService,
  subjectService,
  teacherService,
} from 'shared/api'
import { ManageScheduleCreate } from 'views/manage'

export const revalidate = 0

async function getGroups(accessToken: string) {
  try {
    const groups = await groupService.getAll(accessToken)
    return groups
  } catch (error) {
    redirect('/auth/login')
  }
}

async function getSubjects(accessToken: string) {
  try {
    const subjects = await subjectService.getAll(accessToken)
    return subjects
  } catch (error) {
    redirect('/auth/login')
  }
}

async function getTeachers(accessToken: string) {
  try {
    const teachers = await teacherService.getAll(accessToken)
    return teachers
  } catch (error) {
    redirect('/auth/login')
  }
}

export default async function Page() {
  const cookie = await cookies()
  const accessToken = cookie.get(ACCESS_TOKEN_KEY)?.value

  if (!accessToken) {
    return redirect('/auth/login')
  }

  const groups = await getGroups(accessToken)
  const subjects = await getSubjects(accessToken)
  const teachers = await getTeachers(accessToken)

  return (
    <ManageScheduleCreate
      groups={groups}
      subjects={subjects}
      teachers={teachers}
    />
  )
}
