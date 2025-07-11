import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users.repository.js'
import { AuthenticateUseCase } from '@/use-cases/authenticate.js'

export function makeAuthenticateUseCase(): AuthenticateUseCase {
  const usersRepository = new PrismaUsersRepository()
  const useCase = new AuthenticateUseCase(usersRepository)

  return useCase
}
