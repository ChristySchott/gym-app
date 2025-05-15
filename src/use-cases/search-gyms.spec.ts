import { expect, describe, it, beforeEach } from 'vitest'

import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms.repository.js'

import { SearchGymsUseCase } from './search-gyms.js'

let gymsRepository: InMemoryGymsRepository
let sut: SearchGymsUseCase

describe('Search Gyms Use Case', () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new SearchGymsUseCase(gymsRepository)
  })

  it('should be to search for gyms', async () => {
    await gymsRepository.create({
      title: 'My Gym',
      description: 'Gym used for tests',
      phone: null,
      latitude: 9.5770097,
      longitude: 33.7041094,
    })

    await gymsRepository.create({
      title: 'Your Gym',
      description: 'Gym used for tests',
      phone: null,
      latitude: 9.5770097,
      longitude: 33.7041094,
    })

    const { gyms } = await sut.execute({ query: 'My Gym', page: 1 })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: 'My Gym' })])
  })

  it('should be to fetch paginated check-ins history', async () => {
    for (let i = 1; i <= 22; i++) {
      await gymsRepository.create({
        title: `My Gym ${i}`,
        description: `Gym ${i} used for tests`,
        phone: null,
        latitude: 9.5770097,
        longitude: 33.7041094,
      })
    }

    const { gyms } = await sut.execute({ query: 'My Gym', page: 2 })

    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'My Gym 21' }),
      expect.objectContaining({ title: 'My Gym 22' }),
    ])
  })
})
