import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users.repository.js'
import { RegisterUseCase } from '@/use-cases/register.js'

export function makeRegisterUseCase(): RegisterUseCase {
  const usersRepository = new PrismaUsersRepository()
  const useCase = new RegisterUseCase(usersRepository)

  return useCase
}
