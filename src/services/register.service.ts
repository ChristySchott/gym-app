import { hash } from 'bcryptjs'

import { UsersRepository } from '@/repositories/users.repository.js'

interface RegisterParams {
  name: string
  email: string
  password: string
}

export class RegisterService {
  private usersRepository: UsersRepository

  constructor(usersRepository: UsersRepository) {
    this.usersRepository = usersRepository
  }

  async execute({ name, email, password }: RegisterParams) {
    const passwordHash = await hash(password, 6)

    const userWithSameEmail = await this.usersRepository.findByEmail(email)

    if (userWithSameEmail) {
      throw new Error('E-mail already exists')
    }

    await this.usersRepository.create({
      name,
      email,
      password_hash: passwordHash,
    })
  }
}
