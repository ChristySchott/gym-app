import { Gym } from 'generated/prisma/index.js'

export interface GymsRepository {
  findById(id: string): Promise<Gym | null>
}
