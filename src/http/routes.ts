import { FastifyInstance } from 'fastify'

import { register } from '@/http/controllers/register.controller.js'
import { authenticate } from '@/http/controllers/authenticate.controller.js'
import { profile } from '@/http/controllers/profile.controller.js'

import { verifyJWT } from '@/http/middlewares/verify-jwt.js'

export async function appRoutes(app: FastifyInstance) {
  app.post('/users', register)
  app.post('/authenticate', authenticate)

  app.get('/me', { onRequest: [verifyJWT] }, profile)
}
