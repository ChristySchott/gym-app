import { FastifyInstance } from 'fastify'

import { register } from '@/http/controllers/register.controller.js'
import { authenticate } from '@/http/controllers/authenticate.controller.js'

export async function appRoutes(app: FastifyInstance) {
  app.post('/users', register)

  app.post('/sessions', authenticate)
}
