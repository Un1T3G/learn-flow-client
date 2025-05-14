'use client'

import { useTranslations } from 'next-intl'
import {
  GroupCreateModal,
  GroupDataTable,
  GroupDeleteModal,
  GroupUpdateModal,
} from 'widgets/groups'

export const ManageGroupsPage = () => {
  const t = useTranslations()

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">{t('navigation.manageGroups')}</h1>
        <GroupCreateModal />
      </div>
      <GroupDataTable
        renderDeleteButton={(id) => <GroupDeleteModal id={id} />}
        renderUpdateButton={(id, initialValues) => (
          <GroupUpdateModal id={id} initialValues={initialValues} />
        )}
      />
    </div>
  )
}
