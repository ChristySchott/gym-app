import { FastifyInstance } from 'fastify'

import { register } from './register.controller.js'
import { authenticate } from './authenticate.controller.js'
import { profile } from './profile.controller.js'

import { verifyJWT } from '@/http/middlewares/verify-jwt.js'

export async function usersRoutes(app: FastifyInstance) {
  app.post('/users', register)
  app.post('/authenticate', authenticate)

  app.get('/me', { onRequest: [verifyJWT] }, profile)
}
