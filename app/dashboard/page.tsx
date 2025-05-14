import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { ACCESS_TOKEN_KEY, userService } from 'shared/api'
import { scheduleService } from 'shared/api/schedule'
import { DashboardPage } from 'views/dashboard'

export const revalidate = 0

async function getProfile(accessToken: string) {
  const user = await userService.getProfile(accessToken)

  return user
}

async function getActualWeekSchedule(accessToken: string, groupId: string) {
  const schedule = await scheduleService.getActualWeekSchedule(
    accessToken,
    groupId
  )
  return schedule
}

export default async function Page() {
  const cookie = await cookies()
  const accessToken = cookie.get(ACCESS_TOKEN_KEY)?.value

  if (!accessToken) {
    redirect('/auth/login')
  }

  const profile = await getProfile(accessToken)
  console.log(profile)
  const schedule = await getActualWeekSchedule(accessToken, profile.groupId)

  return <DashboardPage schedule={schedule} />
}
