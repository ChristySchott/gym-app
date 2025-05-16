import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { makeValidateCheckInUseCase } from '@/use-cases/factories/make-validate-check-in-use-case.js'

export async function validate(request: FastifyRequest, reply: FastifyReply) {
  const validateCheckInParamsSchema = z.object({
    id: z.string(),
  })

  const { id } = validateCheckInParamsSchema.parse(request.params)

  const validateCheckInUseCase = makeValidateCheckInUseCase()

  const { checkIn } = await validateCheckInUseCase.execute({ checkInId: id })

  return reply.status(201).send({
    checkIn,
  })
}
