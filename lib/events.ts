'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { turso } from './db'
import { getSession } from './auth'

export type Event = {
  id: number
  title: string
  slug: string
  description: string
  date: string
  time: string
  type: string
  category: string
  max_attendees: number | null
  cover_image: string | null
  published: number
  created_at: string
  updated_at: string
  author_id: number
  registration_count?: number
}

export type EventRegistration = {
  id: number
  event_id: number
  name: string
  email: string
  phone: string | null
  notes: string | null
  created_at: string
}

export async function getPublishedEvents() {
  const result = await turso.execute({
    sql: `SELECT e.*,
          (SELECT COUNT(*) FROM event_registrations WHERE event_id = e.id) as registration_count
          FROM events e
          WHERE e.published = 1
          ORDER BY e.date DESC`,
  })
  return result.rows as unknown as Event[]
}

export async function getPublishedEventsByCategory(category: string) {
  const result = await turso.execute({
    sql: `SELECT e.*,
          (SELECT COUNT(*) FROM event_registrations WHERE event_id = e.id) as registration_count
          FROM events e
          WHERE e.published = 1 AND e.category = ?
          ORDER BY e.date DESC`,
    args: [category],
  })
  return result.rows as unknown as Event[]
}

export async function getUpcomingEvents(limit = 3) {
  const result = await turso.execute({
    sql: `SELECT e.*,
          (SELECT COUNT(*) FROM event_registrations WHERE event_id = e.id) as registration_count
          FROM events e
          WHERE e.published = 1 AND e.date >= date('now')
          ORDER BY e.date ASC
          LIMIT ?`,
    args: [limit],
  })
  return result.rows as unknown as Event[]
}

export async function getEventBySlug(slug: string) {
  const result = await turso.execute({
    sql: `SELECT e.*,
          (SELECT COUNT(*) FROM event_registrations WHERE event_id = e.id) as registration_count
          FROM events e
          WHERE e.slug = ? AND e.published = 1`,
    args: [slug],
  })
  return result.rows[0] as unknown as Event | undefined
}

export async function getAllEvents() {
  const session = await getSession()
  if (!session) redirect('/admin/login')

  const result = await turso.execute({
    sql: `SELECT e.*,
          (SELECT COUNT(*) FROM event_registrations WHERE event_id = e.id) as registration_count
          FROM events e
          ORDER BY e.created_at DESC`,
  })
  return result.rows as unknown as Event[]
}

export async function getEventById(id: number) {
  const session = await getSession()
  if (!session) redirect('/admin/login')

  const result = await turso.execute({
    sql: `SELECT e.*,
          (SELECT COUNT(*) FROM event_registrations WHERE event_id = e.id) as registration_count
          FROM events e WHERE e.id = ?`,
    args: [id],
  })
  return result.rows[0] as unknown as Event | undefined
}

export async function getEventRegistrations(eventId: number) {
  const session = await getSession()
  if (!session) redirect('/admin/login')

  const result = await turso.execute({
    sql: 'SELECT * FROM event_registrations WHERE event_id = ? ORDER BY created_at DESC',
    args: [eventId],
  })
  return result.rows as unknown as EventRegistration[]
}

export async function createEvent(formData: FormData) {
  const session = await getSession()
  if (!session) redirect('/admin/login')

  const title = formData.get('title') as string
  const slug = formData.get('slug') as string
  const description = formData.get('description') as string
  const date = formData.get('date') as string
  const time = formData.get('time') as string
  const type = formData.get('type') as string
  const category = formData.get('category') as string
  const maxAttendees = formData.get('max_attendees') as string
  const coverImage = formData.get('cover_image') as string || null
  const published = formData.get('published') === 'on' ? 1 : 0

  await turso.execute({
    sql: `INSERT INTO events (title, slug, description, date, time, type, category, max_attendees, cover_image, published, author_id)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    args: [title, slug, description, date, time, type, category, maxAttendees ? parseInt(maxAttendees) : null, coverImage, published, session.userId],
  })

  revalidatePath('/events')
  revalidatePath('/admin/events')
  redirect('/admin/events')
}

export async function updateEvent(id: number, formData: FormData) {
  const session = await getSession()
  if (!session) redirect('/admin/login')

  const title = formData.get('title') as string
  const slug = formData.get('slug') as string
  const description = formData.get('description') as string
  const date = formData.get('date') as string
  const time = formData.get('time') as string
  const type = formData.get('type') as string
  const category = formData.get('category') as string
  const maxAttendees = formData.get('max_attendees') as string
  const coverImage = formData.get('cover_image') as string || null
  const published = formData.get('published') === 'on' ? 1 : 0

  await turso.execute({
    sql: `UPDATE events
          SET title = ?, slug = ?, description = ?, date = ?, time = ?, type = ?, category = ?, max_attendees = ?, cover_image = ?, published = ?, updated_at = CURRENT_TIMESTAMP
          WHERE id = ?`,
    args: [title, slug, description, date, time, type, category, maxAttendees ? parseInt(maxAttendees) : null, coverImage, published, id],
  })

  revalidatePath('/events')
  revalidatePath('/events/' + slug)
  revalidatePath('/admin/events')
  redirect('/admin/events')
}

export async function deleteEvent(id: number) {
  const session = await getSession()
  if (!session) redirect('/admin/login')

  await turso.execute({
    sql: 'DELETE FROM events WHERE id = ?',
    args: [id],
  })

  revalidatePath('/events')
  revalidatePath('/admin/events')
}

// Registration is handled via the /api/events/register API route
