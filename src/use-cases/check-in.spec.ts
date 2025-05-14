import { expect, describe, it, beforeEach } from 'vitest'

import { CheckInsRepository } from '@/repositories/check-ins.repository.js'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins.repository.js'
import { CheckInUseCase } from './check-in.js'

let checkInsRepository: CheckInsRepository
let checkInUseCase: CheckInUseCase

describe('Check In Use Case', () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository()
    checkInUseCase = new CheckInUseCase(checkInsRepository)
  })

  it('should be able to check in', async () => {
    const { checkIn } = await checkInUseCase.execute({
      userId: 'user-id',
      gymId: 'gym-id',
    })

    expect(checkIn.user_id).toEqual('user-id')
  })
})
