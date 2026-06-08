import { NextResponse } from 'next/server'
import { turso } from '@/lib/db'

export async function GET() {
  try {
    const result = await turso.execute({
      sql: `SELECT e.*,
            (SELECT COUNT(*) FROM event_registrations WHERE event_id = e.id) as registration_count
            FROM events e
            WHERE e.published = 1 AND e.date >= date('now')
            ORDER BY e.date ASC
            LIMIT 3`,
    })

    return NextResponse.json(result.rows)
  } catch (error) {
    console.error('Upcoming events fetch error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch upcoming events' },
      { status: 500 }
    )
  }
}
