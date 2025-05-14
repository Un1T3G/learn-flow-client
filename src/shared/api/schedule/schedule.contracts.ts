import { z } from 'zod'

export const scheduleCreateFormSchema = z.object({
  weekSchedule: z.object({}),
})

export const scheduleUpdateFormSchema = z.object({
  from: z.string().nonempty({ message: 'validation.mustNotBeEmpty' }),
  weekSchedule: z.object({}),
})
