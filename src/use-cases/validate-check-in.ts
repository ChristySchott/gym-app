import dayjs from 'dayjs'
import { CheckIn } from 'generated/prisma/index.js'

import { CheckInsRepository } from '@/repositories/check-ins.repository.js'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error.js'
import { LateCheckInValidationError } from '@/use-cases/errors/late-check-in-validation-error.js'

interface ValidateCheckInUseCaseRequest {
  checkInId: string
}

interface ValidateCheckInUseCaseResponse {
  checkIn: CheckIn
}

const MAX_CHECK_IN_VALIDATION_TIME = 20

export class ValidateCheckInUseCase {
  private checkInsRepository: CheckInsRepository

  constructor(checkInsRepository: CheckInsRepository) {
    this.checkInsRepository = checkInsRepository
  }

  async execute({
    checkInId,
  }: ValidateCheckInUseCaseRequest): Promise<ValidateCheckInUseCaseResponse> {
    const checkIn = await this.checkInsRepository.findById(checkInId)

    if (!checkIn) {
      throw new ResourceNotFoundError()
    }

    const distanceInMinutesFromCheckInCreation = dayjs(new Date()).diff(
      checkIn.created_at,
      'minutes',
    )

    if (distanceInMinutesFromCheckInCreation > MAX_CHECK_IN_VALIDATION_TIME) {
      throw new LateCheckInValidationError()
    }

    checkIn.validated_at = new Date()

    await this.checkInsRepository.save(checkIn)

    return {
      checkIn,
    }
  }
}
