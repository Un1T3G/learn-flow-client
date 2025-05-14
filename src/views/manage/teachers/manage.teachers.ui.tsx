'use client'

import { TeacherDeleteButton } from 'features/teachers'
import { useTranslations } from 'next-intl'
import {
  TeacherCreateModal,
  TeacherDataTable,
  TeacherUpdateModal,
} from 'widgets/teachers'

export const ManageTeachersPage = () => {
  const t = useTranslations()

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">{t('navigation.manageTeachers')}</h1>
        <TeacherCreateModal />
      </div>

      <TeacherDataTable
        renderDeleteButton={(id) => <TeacherDeleteButton id={id} />}
        renderUpdateButton={(id, initialValues) => (
          <TeacherUpdateModal id={id} initialValues={initialValues} />
        )}
      />
    </div>
  )
}
