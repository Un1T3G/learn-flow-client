'use client'

import { useTranslations } from 'next-intl'
import { GroupResponse } from 'shared/api'
import {
  UserStudentCreateModal,
  UserStudentDataTable,
  UserStudentDeleteModal,
  UserStudentUpdateModal,
} from 'widgets/users'

interface IProps {
  groups: GroupResponse[]
}

export const ManageStudentsPage = ({ groups }: IProps) => {
  const t = useTranslations()

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">{t('navigation.manageStudents')}</h1>
        <UserStudentCreateModal groups={groups} />
      </div>

      <UserStudentDataTable
        groups={groups}
        renderDeleteButton={(id) => <UserStudentDeleteModal id={id} />}
        renderUpdateButton={(id, initialValues) => (
          <UserStudentUpdateModal
            groups={groups}
            id={id}
            initialValues={initialValues}
          />
        )}
      />
    </div>
  )
}
