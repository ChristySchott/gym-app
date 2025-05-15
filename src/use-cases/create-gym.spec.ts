import { expect, describe, it, beforeEach } from 'vitest'

import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms.repository.js'

import { CreateGymUseCase } from './create-gym.js'

let gymsRepository: InMemoryGymsRepository
let sut: CreateGymUseCase

describe('CreateGym Use Case', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new CreateGymUseCase(gymsRepository)
  })

  it('should be able to create a gym', async () => {
    const { gym } = await sut.execute({
      title: 'My Gym',
      description: 'Gym used for tests',
      phone: null,
      latitude: 9.5770097,
      longitude: 33.7041094,
    })

    expect(gym.id).toEqual(expect.any(String))
  })
})
