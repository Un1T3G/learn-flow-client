import { z } from 'zod'

export const reviewFormSchema = z.object({
  comment: z
    .string({ message: 'validation.mustBeString' })
    .nonempty({ message: 'validation.mustNotBeEmpty' }),
  score: z
    .string({ message: 'validation.mustBeString' })
    .nonempty({ message: 'validation.mustNotBeEmpty' }),
})
