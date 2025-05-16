import supertest from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user.js'

import { app } from '@/app.js'

describe('Profile (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to get user profile', async () => {
    const { token } = await createAndAuthenticateUser(app)

    const profileResponse = await supertest(app.server)
      .get('/me')
      .set('Authorization', `Bearer ${token}`)

    expect(profileResponse.statusCode).toEqual(200)
    expect(profileResponse.body).toEqual({
      id: expect.any(String),
      email: 'johndoe@example.com',
      name: 'John Doe',
      created_at: expect.any(String),
    })
  })
})
