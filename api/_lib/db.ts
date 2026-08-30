import { neon } from '@neondatabase/serverless'
import { drizzle } from 'drizzle-orm/neon-http'

export function getDb() {
  if (!process.env.DATABASE_URL) throw new Error('DATABASE_URL não configurada')
  return drizzle(neon(process.env.DATABASE_URL))
}

