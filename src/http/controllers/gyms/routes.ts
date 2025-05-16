import { FastifyInstance } from 'fastify'

import { create } from './create.controller.js'
import { search } from './search.controller.js'
import { nearby } from './nearby.controller.js'

import { verifyJWT } from '@/http/middlewares/verify-jwt.js'
import { verifyUserRole } from '@/http/middlewares/verify-user-role.js'

export async function gymsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)

  app.post('/gyms', { onRequest: [verifyUserRole('ADMIN')] }, create)

  app.get('/gyms/search', search)
  app.get('/gyms/nearby', nearby)
}
