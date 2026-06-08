import { NextResponse } from 'next/server'
import { turso } from '@/lib/db'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')

    let sql: string
    let args: (string | number)[] = []

    if (category) {
      sql = `SELECT e.*,
            (SELECT COUNT(*) FROM event_registrations WHERE event_id = e.id) as registration_count
            FROM events e
            WHERE e.published = 1 AND e.category = ?
            ORDER BY e.date DESC`
      args = [category]
    } else {
      sql = `SELECT e.*,
            (SELECT COUNT(*) FROM event_registrations WHERE event_id = e.id) as registration_count
            FROM events e
            WHERE e.published = 1
            ORDER BY e.date DESC`
    }

    const result = await turso.execute({ sql, args })
    return NextResponse.json(result.rows)
  } catch (error) {
    console.error('Events fetch error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch events' },
      { status: 500 }
    )
  }
}
