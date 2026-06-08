import { getAllEvents, deleteEvent } from '@/lib/events'
import Link from 'next/link'
import { Plus, Calendar, Eye, EyeOff, Edit, Users } from 'lucide-react'
import { redirect } from 'next/navigation'
import { DeleteButton } from '@/components/DeleteButton'

export const dynamic = 'force-dynamic'

export default async function AdminEventsPage() {
  const events = await getAllEvents()

  async function handleDelete(formData: FormData) {
    'use server'
    const id = parseInt(formData.get('id') as string)
    await deleteEvent(id)
    redirect('/admin/events')
  }

  return (
    <div className="p-6 sm:p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Events</h1>
          <p className="text-muted-foreground mt-1">
            Manage your community events
          </p>
        </div>
        <Link
          href="/admin/events/new"
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
        >
          <Plus size={18} />
          New Event
        </Link>
      </div>

      {/* Events Table */}
      <div className="bg-white rounded-xl border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-muted/50 border-b border-border">
                <th className="text-left px-6 py-3 text-sm font-medium text-muted-foreground">Event</th>
                <th className="text-left px-6 py-3 text-sm font-medium text-muted-foreground hidden sm:table-cell">Date</th>
                <th className="text-left px-6 py-3 text-sm font-medium text-muted-foreground hidden sm:table-cell">Status</th>
                <th className="text-left px-6 py-3 text-sm font-medium text-muted-foreground hidden md:table-cell">Registrations</th>
                <th className="text-right px-6 py-3 text-sm font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {events.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center gap-2">
                      <Calendar size={32} className="text-muted-foreground/50" />
                      <p className="text-muted-foreground">No events yet</p>
                      <Link
                        href="/admin/events/new"
                        className="text-primary hover:underline text-sm font-medium"
                      >
                        Create your first event
                      </Link>
                    </div>
                  </td>
                </tr>
              ) : (
                events.map((event) => (
                  <tr key={event.id} className="hover:bg-muted/30 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {event.cover_image ? (
                          <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0">
                            <img src={event.cover_image} alt="" className="w-full h-full object-cover" />
                          </div>
                        ) : (
                          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center flex-shrink-0">
                            <Calendar size={16} className="text-primary/50" />
                          </div>
                        )}
                        <div className="min-w-0">
                          <p className="font-medium text-foreground truncate max-w-[200px] sm:max-w-[300px]">
                            {event.title}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {event.type} &middot; {event.category}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-muted-foreground hidden sm:table-cell">
                      {new Date(event.date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                      <br />
                      <span className="text-xs">{event.time}</span>
                    </td>
                    <td className="px-6 py-4 hidden sm:table-cell">
                      {event.published ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700 border border-green-200">
                          <Eye size={12} />
                          Published
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-yellow-50 text-yellow-700 border border-yellow-200">
                          <EyeOff size={12} />
                          Draft
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 hidden md:table-cell">
                      <div className="flex items-center gap-2 text-sm">
                        <Users size={14} className="text-muted-foreground" />
                        <span className="text-muted-foreground">
                          {(event as any).registration_count || 0}
                          {event.max_attendees ? ` / ${event.max_attendees}` : ''}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/admin/events/${event.id}/registrations`}
                          className="p-2 rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/5 transition-colors"
                          title="View Registrations"
                        >
                          <Users size={16} />
                        </Link>
                        <Link
                          href={`/admin/events/${event.id}/edit`}
                          className="p-2 rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/5 transition-colors"
                          title="Edit"
                        >
                          <Edit size={16} />
                        </Link>
                        <form action={handleDelete}>
                          <input type="hidden" name="id" value={event.id} />
                          <DeleteButton message="Delete this event and all registrations?" />
                        </form>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
