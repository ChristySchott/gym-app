import supertest from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user.js'

import { app } from '@/app.js'

describe('Create Gym (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create a gym', async () => {
    const { token } = await createAndAuthenticateUser(app, true)

    const response = await supertest(app.server)
      .post('/gyms')
      .send({
        title: 'My Gym',
        description: 'Gym used for tests',
        phone: null,
        latitude: 9.5770097,
        longitude: 33.7041094,
      })
      .set('Authorization', `Bearer ${token}`)

    expect(response.statusCode).toEqual(201)
  })
})
