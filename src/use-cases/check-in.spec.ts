import { expect, describe, it, beforeEach, afterEach, vi } from 'vitest'

import { CheckInsRepository } from '@/repositories/check-ins.repository.js'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins.repository.js'
import { CheckInUseCase } from './check-in.js'

let checkInsRepository: CheckInsRepository
let checkInUseCase: CheckInUseCase

describe('Check In Use Case', () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository()
    checkInUseCase = new CheckInUseCase(checkInsRepository)
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to check in', async () => {
    const { checkIn } = await checkInUseCase.execute({
      userId: 'user-01',
      gymId: 'gym-01',
    })

    expect(checkIn.user_id).toEqual('user-01')
  })

  it('should not be able to check in twice in the same day', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

    await checkInUseCase.execute({
      userId: 'user-01',
      gymId: 'gym-01',
    })

    await expect(() =>
      checkInUseCase.execute({
        userId: 'user-01',
        gymId: 'gym-01',
      }),
    ).rejects.toBeInstanceOf(Error)
  })

  it('should be able to check in twice but in different days', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

    await checkInUseCase.execute({
      userId: 'user-01',
      gymId: 'gym-01',
    })

    vi.setSystemTime(new Date(2022, 0, 21, 8, 0, 0))

    const { checkIn } = await checkInUseCase.execute({
      userId: 'user-01',
      gymId: 'gym-01',
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })
})
