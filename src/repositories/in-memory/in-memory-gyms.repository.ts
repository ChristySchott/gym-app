import { Gym } from 'generated/prisma/index.js'

import { GymsRepository } from '@/repositories/gyms.repository.js'

export class InMemoryGymsRepository implements GymsRepository {
  public items: Gym[] = []

  async findById(id: string) {
    const gym = this.items.find((item) => item.id === id)

    if (!gym) {
      return null
    }

    return gym
  }
}
