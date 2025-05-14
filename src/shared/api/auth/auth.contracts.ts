import { z } from 'zod'

export const authLoginFormSchema = z.object({
  login: z
    .string({ message: 'validation.mustBeString' })
    .nonempty({ message: 'validation.mustNotBeEmpty' }),
  password: z
    .string({ message: 'validation.mustBeString' })
    .nonempty({ message: 'validation.mustNotBeEmpty' }),
})

export const authRegisterFormSchema = z.object({
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
  secret: z
    .string({ message: 'validation.mustBeString' })
    .nonempty({ message: 'validation.mustNotBeEmpty' }),
})
