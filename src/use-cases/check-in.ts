import { CheckIn } from 'generated/prisma/index.js'

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

export class CheckInUseCase {
  private gymsRepository: GymsRepository
  private checkInsRepository: CheckInsRepository

  constructor(checkInsRepository: CheckInsRepository, gymsRepository: GymsRepository) {
    this.checkInsRepository = checkInsRepository
    this.gymsRepository = gymsRepository
  }

  async execute({ userId, gymId }: CheckInUseCaseRequest): Promise<CheckInUseCaseResponse> {
    const gym = await this.gymsRepository.findById(gymId)

    if (!gym) {
      throw new ResourceNotFoundError()
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
