import { Prisma, Gym } from 'generated/prisma/index.js'

export interface GymsRepository {
  create(data: Prisma.GymCreateInput): Promise<Gym>
  searchMany(query: string, page: number): Promise<Gym[]>
  findById(id: string): Promise<Gym | null>
}
