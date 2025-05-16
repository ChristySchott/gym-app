import supertest from 'supertest'
import { FastifyInstance } from 'fastify'
import { hash } from 'bcryptjs'
import { prisma } from '@/lib/prisma.js'

export async function createAndAuthenticateUser(app: FastifyInstance, isAdmin = false) {
  await prisma.user.create({
    data: {
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: await hash('123456', 6),
      role: isAdmin ? 'ADMIN' : 'MEMBER',
    },
  })

  const authResponse = await supertest(app.server).post('/authenticate').send({
    email: 'johndoe@example.com',
    password: '123456',
  })

  const { token } = authResponse.body

  return {
    token,
  }
}
