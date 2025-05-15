import { expect, describe, it, beforeEach, afterEach, vi } from 'vitest'

import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins.repository.js'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms.repository.js'
import { MaxNumberOfCheckInsError } from '@/use-cases/errors/max-number-of-check-ins-error.js'
import { MaxDistanceError } from '@/use-cases/errors/max-distance-error.js'

import { CheckInUseCase } from './check-in.js'

let checkInsRepository: InMemoryCheckInsRepository
let gymsRepository: InMemoryGymsRepository
let sut: CheckInUseCase

describe('Check In Use Case', () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository()
    gymsRepository = new InMemoryGymsRepository()
    sut = new CheckInUseCase(checkInsRepository, gymsRepository)

    await gymsRepository.create({
      id: 'gym-01',
      title: 'My Gym',
      description: 'Gym used for tests',
      phone: '99999999',
      latitude: 9.5770097,
      longitude: 33.7041094,
    })

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to check in', async () => {
    const { checkIn } = await sut.execute({
      userId: 'user-01',
      gymId: 'gym-01',
      userLatitude: 9.5770097,
      userLongitude: 33.7041094,
    })

    expect(checkIn.user_id).toEqual('user-01')
  })

  it('should not be able to check in twice in the same day', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

    await sut.execute({
      userId: 'user-01',
      gymId: 'gym-01',
      userLatitude: 9.5770097,
      userLongitude: 33.7041094,
    })

    await expect(() =>
      sut.execute({
        userId: 'user-01',
        gymId: 'gym-01',
        userLatitude: 9.5770097,
        userLongitude: 33.7041094,
      }),
    ).rejects.toBeInstanceOf(MaxNumberOfCheckInsError)
  })

  it('should be able to check in twice but in different days', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

    await sut.execute({
      userId: 'user-01',
      gymId: 'gym-01',
      userLatitude: 9.5770097,
      userLongitude: 33.7041094,
    })

    vi.setSystemTime(new Date(2022, 0, 21, 8, 0, 0))

    const { checkIn } = await sut.execute({
      userId: 'user-01',
      gymId: 'gym-01',
      userLatitude: 9.5770097,
      userLongitude: 33.7041094,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not be able to check in on a distant gym', async () => {
    await gymsRepository.create({
      id: 'gym-02',
      title: 'Distant Gym',
      description: 'Gym used for tests related to distance',
      phone: '99999999',
      latitude: 10.7180974,
      longitude: 35.9564256,
    })

    await expect(() =>
      sut.execute({
        userId: 'user-01',
        gymId: 'gym-02',
        userLatitude: 9.5770097,
        userLongitude: 33.7041094,
      }),
    ).rejects.toBeInstanceOf(MaxDistanceError)
  })
})
