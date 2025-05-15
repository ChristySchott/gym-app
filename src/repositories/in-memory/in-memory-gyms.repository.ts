import { randomUUID } from 'node:crypto'
import { Gym, Prisma } from 'generated/prisma/index.js'

import { GymsRepository } from '@/repositories/gyms.repository.js'

export class InMemoryGymsRepository implements GymsRepository {
  public items: Gym[] = []

  async create(data: Prisma.GymCreateInput) {
    const gym = {
      id: data.id ?? randomUUID(),
      title: data.title,
      description: data.description ?? null,
      phone: data.phone ?? null,
      latitude: new Prisma.Decimal(data.latitude.toString()),
      longitude: new Prisma.Decimal(data.longitude.toString()),
      created_at: new Date(),
    }

    this.items.push(gym)

    return gym
  }

  async searchMany(query: string, page: number) {
    const _page = (page - 1) * 20

    const gyms = this.items.filter((gym) => gym.title.includes(query)).slice(_page, 40)

    return gyms
  }

  async findById(id: string) {
    const gym = this.items.find((item) => item.id === id)

    if (!gym) {
      return null
    }

    return gym
  }
}
