'use client'

import { useTranslations } from 'next-intl'
import {
  SubjectCreateModal,
  SubjectDataTable,
  SubjectDeleteModal,
  SubjectUpdateModal,
} from 'widgets/subjects'

export const ManageSubjectsPage = () => {
  const t = useTranslations()

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">{t('navigation.manageSubjects')}</h1>
        <SubjectCreateModal />
      </div>

      <SubjectDataTable
        renderDeleteButton={(id) => <SubjectDeleteModal id={id} />}
        renderUpdateButton={(id, initialValues) => (
          <SubjectUpdateModal id={id} initialValues={initialValues} />
        )}
      />
    </div>
  )
}
