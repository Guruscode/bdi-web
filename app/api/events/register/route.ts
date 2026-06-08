import { NextResponse } from 'next/server'
import { turso } from '@/lib/db'

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const eventId = parseInt(formData.get('event_id') as string)
    const name = formData.get('name') as string
    const email = formData.get('email') as string
    const phone = (formData.get('phone') as string) || null
    const notes = (formData.get('notes') as string) || null

    if (!eventId || !name || !email) {
      return NextResponse.json(
        { error: 'Name, email, and event are required' },
        { status: 400 }
      )
    }

    // Check if event exists and is published
    const eventResult = await turso.execute({
      sql: 'SELECT id, max_attendees FROM events WHERE id = ? AND published = 1',
      args: [eventId],
    })

    if (!eventResult.rows[0]) {
      return NextResponse.json(
        { error: 'Event not found or not available' },
        { status: 404 }
      )
    }

    const maxAttendees = eventResult.rows[0].max_attendees as number | null

    // Check capacity
    if (maxAttendees) {
      const countResult = await turso.execute({
        sql: 'SELECT COUNT(*) as count FROM event_registrations WHERE event_id = ?',
        args: [eventId],
      })
      const currentCount = countResult.rows[0]?.count as number
      if (currentCount >= maxAttendees) {
        return NextResponse.json(
          { error: 'Event is fully booked' },
          { status: 400 }
        )
      }
    }

    // Register
    await turso.execute({
      sql: 'INSERT INTO event_registrations (event_id, name, email, phone, notes) VALUES (?, ?, ?, ?, ?)',
      args: [eventId, name, email, phone, notes],
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Registration error:', error)
    return NextResponse.json(
      { error: 'Failed to register for event' },
      { status: 500 }
    )
  }
}
