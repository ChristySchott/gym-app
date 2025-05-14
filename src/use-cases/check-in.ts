import { CheckIn } from 'generated/prisma/index.js'

import { CheckInsRepository } from '@/repositories/check-ins.repository.js'

interface CheckInUseCaseRequest {
  userId: string
  gymId: string
}

interface CheckInUseCaseResponse {
  checkIn: CheckIn
}

export class CheckInUseCase {
  private checkInRepository: CheckInsRepository

  constructor(checkInRepository: CheckInsRepository) {
    this.checkInRepository = checkInRepository
  }

  async execute({ userId, gymId }: CheckInUseCaseRequest): Promise<CheckInUseCaseResponse> {
    const checkInOnSameDate = await this.checkInRepository.findByUserIdOnDate(userId, new Date())

    if (checkInOnSameDate) {
      throw new Error()
    }

    const checkIn = await this.checkInRepository.create({ user_id: userId, gym_id: gymId })

    return {
      checkIn,
    }
  }
}
