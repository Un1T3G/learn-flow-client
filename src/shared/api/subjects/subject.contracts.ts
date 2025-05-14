import { z } from 'zod'

export const subjectFormSchema = z.object({
  name: z
    .string({ message: 'validation.mustBeString' })
    .nonempty({ message: 'validation.mustNotBeEmpty' }),
})
