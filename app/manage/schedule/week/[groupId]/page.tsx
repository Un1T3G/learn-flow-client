import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { ACCESS_TOKEN_KEY, scheduleService } from 'shared/api'
import { ManageScheduleManageWeekPage } from 'views/manage'

export const revalidate = 0

async function getWeekSchedule(
  accessToken: string,
  groupId: string,
  from: string,
  to: string
) {
  const schedule = await scheduleService.getWeekSchedule(groupId, accessToken, {
    from,
    to,
  })
  return schedule
}

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ groupId: string }>
  searchParams: Promise<{
    [key: string]: string | string[] | undefined
  }>
}) {
  const cookie = await cookies()
  const accessToken = cookie.get(ACCESS_TOKEN_KEY)?.value

  console.log(accessToken)

  if (!accessToken) {
    return redirect('/auth/login')
  }

  const { groupId } = await params
  const a = await searchParams

  const from = a.from as string
  const to = a.to as string

  const schedule = await getWeekSchedule(accessToken, groupId, from, to)

  return <ManageScheduleManageWeekPage schedule={schedule} />
}
