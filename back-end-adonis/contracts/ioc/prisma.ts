declare module '@ioc:Orm/Prisma' {
  import { PrismaClient } from '@prisma/client'

  const prisma: PrismaClient

  export default prisma
}
