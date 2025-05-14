'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import { useForm } from 'react-hook-form'
import { SubjectResponse, TeacherResponse } from 'shared/api'
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from 'shared/ui'
import { z } from 'zod'

interface IProps {
  subjects: SubjectResponse[]
  teachers: TeacherResponse[]
  onCreate: (props: {
    subjectId: string
    teacherId: string
    time: string
  }) => void
}

const schema = z.object({
  subjectId: z.string().nonempty({ message: 'validation.mustNotBeEmpty' }),
  teacherId: z.string().nonempty({ message: 'validation.mustNotBeEmpty' }),
  time: z.string(),
})

export const ScheduleItemCreateForm = ({
  subjects,
  teachers,
  onCreate,
}: IProps) => {
  const form = useForm<z.infer<typeof schema>>({
    defaultValues: {
      subjectId: '',
      teacherId: '',
      time: '',
    },
    resolver: zodResolver(schema),
  })
  const t = useTranslations()

  const onSubmit = form.handleSubmit(({ subjectId, teacherId, time }) => {
    onCreate({
      subjectId,
      teacherId,
      time: new Date().toISOString(),
    })
  })

  return (
    <Form {...form}>
      <form id="item-form" onSubmit={onSubmit}>
        <FormField
          name="subjectId"
          control={form.control}
          render={({ field }) => (
            <FormItem className="mb-2">
              <FormLabel>{t('form.subjectLabel')}</FormLabel>
              <FormControl>
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder={t('form.subjectPlaceholder')} />
                  </SelectTrigger>
                  <SelectContent>
                    {subjects.map((subject) => (
                      <SelectItem key={subject.id} value={subject.id}>
                        {subject.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="teacherId"
          control={form.control}
          render={({ field }) => (
            <FormItem className="mb-2">
              <FormLabel>{t('form.teacherLabel')}</FormLabel>
              <FormControl>
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder={t('form.teacherPlaceholder')} />
                  </SelectTrigger>
                  <SelectContent>
                    {teachers.map((teacher) => (
                      <SelectItem key={teacher.id} value={teacher.id}>
                        {teacher.firstName.at(0)}.{teacher.lastName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="w-full" form="item-form" onClick={onSubmit}>
          {t('actions.createAction')}
        </Button>
      </form>
    </Form>
  )
}
