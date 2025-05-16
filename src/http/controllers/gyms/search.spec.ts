import supertest from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user.js'

import { app } from '@/app.js'

describe('Search Gyms (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to search gyms by title', async () => {
    const { token } = await createAndAuthenticateUser(app, true)

    await supertest(app.server)
      .post('/gyms')
      .send({
        title: 'JavaScript Gym',
        description: null,
        phone: null,
        latitude: 9.5770097,
        longitude: 33.7041094,
      })
      .set('Authorization', `Bearer ${token}`)

    await supertest(app.server)
      .post('/gyms')
      .send({
        title: 'Typescript Gym',
        description: null,
        phone: null,
        latitude: 49.5770097,
        longitude: 123.7041094,
      })
      .set('Authorization', `Bearer ${token}`)

    const response = await supertest(app.server)
      .get('/gyms/search')
      .query({
        query: 'JavaScript',
        page: 1,
      })
      .set('Authorization', `Bearer ${token}`)

    expect(response.statusCode).toEqual(200)
    expect(response.body.gyms).toHaveLength(1)
    expect(response.body.gyms).toEqual([
      expect.objectContaining({
        title: 'JavaScript Gym',
      }),
    ])
  })
})
