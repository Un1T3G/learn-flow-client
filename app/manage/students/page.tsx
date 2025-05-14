import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { ACCESS_TOKEN_KEY, groupService } from 'shared/api'
import { ManageStudentsPage } from 'views/manage'

export const revalidate = 0

async function getGroups(accessToken: string) {
  try {
    const groups = await groupService.getAll(accessToken)
    return groups
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

  return <ManageStudentsPage groups={groups} />
}
