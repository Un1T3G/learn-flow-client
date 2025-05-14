import { z } from 'zod'

export const userStudentFormSchema = z.object({
  firstName: z
    .string({ message: 'validation.mustBeString' })
    .nonempty({ message: 'validation.mustNotBeEmpty' }),
  lastName: z
    .string({ message: 'validation.mustBeString' })
    .nonempty({ message: 'validation.mustNotBeEmpty' }),
  login: z
    .string({ message: 'validation.mustBeString' })
    .nonempty({ message: 'validation.mustNotBeEmpty' }),
  password: z
    .string({ message: 'validation.mustBeString' })
    .nonempty({ message: 'validation.mustNotBeEmpty' }),
  groupId: z.string().nonempty({ message: 'validation.mustNotBeEmpty' }),
})
