import { randomUUID } from 'node:crypto'
import { Gym, Prisma } from 'generated/prisma/index.js'

import { FindManyNearbyParams, GymsRepository } from '@/repositories/gyms.repository.js'
import { getDistanceBetweenCoordinates } from '@/utils/get-distance-between-coordinates.js'

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

  async findManyNearby(params: FindManyNearbyParams): Promise<Gym[]> {
    const gyms = this.items.filter((item) => {
      const distance = getDistanceBetweenCoordinates(
        { latitude: params.latitude, longitude: params.longitude },
        { latitude: item.latitude.toNumber(), longitude: item.longitude.toNumber() },
      )

      return distance < 10 // Kilometers
    })

    return gyms
  }
}
