import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms.repository.js'
import { SearchGymsUseCase } from '@/use-cases/search-gyms.js'

export function makeSearchGymsUseCase() {
  const gymsRepository = new PrismaGymsRepository()
  const useCase = new SearchGymsUseCase(gymsRepository)

  return useCase
}
