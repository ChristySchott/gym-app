import { hash } from 'bcryptjs'
import { expect, describe, it } from 'vitest'

import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users.repository.js'
import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials-error.js'

import { AuthenticateUseCase } from './authenticate.js'

describe('Authenticate Use Case', () => {
  it('should be able to authenticate', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const authenticateUseCase = new AuthenticateUseCase(usersRepository)

    const email = 'johndoe@example.com'
    const password = '123456'

    await usersRepository.create({
      name: 'John Doe',
      email,
      password_hash: await hash(password, 6),
    })

    const { user } = await authenticateUseCase.execute({ email, password })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should not be able to authenticate with wrong email', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const authenticateUseCase = new AuthenticateUseCase(usersRepository)

    await expect(() =>
      authenticateUseCase.execute({
        email: 'johndoe@example.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able to authenticate if password does not match', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const authenticateUseCase = new AuthenticateUseCase(usersRepository)

    const email = 'johndoe@example.com'

    await usersRepository.create({
      name: 'John Doe',
      email,
      password_hash: await hash('123456', 6),
    })

    await expect(() =>
      authenticateUseCase.execute({
        email,
        password: '222222',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
