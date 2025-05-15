import { expect, describe, it, beforeEach } from 'vitest'

import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins.repository.js'

import { GetUserMetricsUseCase } from './get-user-metrics.js'

let checkInsRepository: InMemoryCheckInsRepository
let sut: GetUserMetricsUseCase

describe('Get User Metrics Use Case', () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository()
    sut = new GetUserMetricsUseCase(checkInsRepository)
  })

  it('should be to get check-ins metrics by user', async () => {
    await checkInsRepository.create({
      user_id: 'user-01',
      gym_id: 'gym-01',
    })

    await checkInsRepository.create({
      user_id: 'user-01',
      gym_id: 'gym-02',
    })

    const { checkInsCount } = await sut.execute({ userId: 'user-01' })

    expect(checkInsCount).toEqual(2)
  })
})
