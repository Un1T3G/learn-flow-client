import { z } from 'zod'

export const groupFormSchema = z.object({
  name: z
    .string({ message: 'validation.mustBeString' })
    .nonempty({ message: 'validation.mustNotBeEmpty' }),
  slug: z
    .string({ message: 'validation.mustBeString' })
    .nonempty({ message: 'validation.mustNotBeEmpty' }),
})
