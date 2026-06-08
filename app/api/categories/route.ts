import { NextResponse } from 'next/server'
import { turso } from '@/lib/db'

export async function GET() {
  const result = await turso.execute({
    sql: 'SELECT id, name, slug FROM categories ORDER BY name ASC',
  })
  return NextResponse.json(result.rows)
}
