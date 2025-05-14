import { CheckIn } from 'generated/prisma/index.js'

import {
  Coordinate,
  getDistanceBetweenCoordinates,
} from '@/utils/get-distance-between-coordinates.js'
import { CheckInsRepository } from '@/repositories/check-ins.repository.js'
import { GymsRepository } from '@/repositories/gyms.repository.js'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error.js'

interface CheckInUseCaseRequest {
  userId: string
  gymId: string
  userLatitude: number
  userLongitude: number
}

interface CheckInUseCaseResponse {
  checkIn: CheckIn
}

const MAX_DISTANCE_IN_KILOMETERS = 0.1

export class CheckInUseCase {
  private gymsRepository: GymsRepository
  private checkInsRepository: CheckInsRepository

  constructor(checkInsRepository: CheckInsRepository, gymsRepository: GymsRepository) {
    this.checkInsRepository = checkInsRepository
    this.gymsRepository = gymsRepository
  }

  async execute({
    userId,
    gymId,
    userLatitude,
    userLongitude,
  }: CheckInUseCaseRequest): Promise<CheckInUseCaseResponse> {
    const gym = await this.gymsRepository.findById(gymId)

    if (!gym) {
      throw new ResourceNotFoundError()
    }

    const userCoordinates: Coordinate = {
      latitude: userLatitude,
      longitude: userLongitude,
    }

    const gymCoordinates: Coordinate = {
      latitude: gym.latitude.toNumber(),
      longitude: gym.longitude.toNumber(),
    }

    const distance = getDistanceBetweenCoordinates(userCoordinates, gymCoordinates)

    if (distance > MAX_DISTANCE_IN_KILOMETERS) {
      throw new Error()
    }

    const checkInOnSameDate = await this.checkInsRepository.findByUserIdOnDate(userId, new Date())

    if (checkInOnSameDate) {
      throw new Error()
    }

    const checkIn = await this.checkInsRepository.create({ user_id: userId, gym_id: gymId })

    return {
      checkIn,
    }
  }
}
