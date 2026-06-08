import { getEventById, getEventRegistrations } from '@/lib/events'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Users, Mail, Phone, Calendar, Download } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default async function EventRegistrationsPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const event = await getEventById(parseInt(id))
  if (!event) notFound()

  const registrations = await getEventRegistrations(parseInt(id))

  return (
    <div className="p-6 sm:p-8">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/events" className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
          <ArrowLeft size={20} />
        </Link>
        <div className="flex-1">
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Registrations</h1>
          <p className="text-muted-foreground mt-1">{event.title}</p>
        </div>
        <div className="text-right text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Users size={16} />
            <span className="font-medium text-foreground">{registrations.length}</span>
            {event.max_attendees && <span>/ {event.max_attendees}</span>}
            <span>registered</span>
          </div>
          <p className="text-xs mt-1">
            {new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} &middot; {event.time}
          </p>
        </div>
      </div>

      {/* Registrations Table */}
      <div className="bg-white rounded-xl border border-border overflow-hidden">
        {registrations.length === 0 ? (
          <div className="text-center py-12">
            <Users size={32} className="mx-auto text-muted-foreground/50 mb-2" />
            <p className="text-muted-foreground">No registrations yet</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-muted/50 border-b border-border">
                  <th className="text-left px-6 py-3 text-sm font-medium text-muted-foreground">Name</th>
                  <th className="text-left px-6 py-3 text-sm font-medium text-muted-foreground">Email</th>
                  <th className="text-left px-6 py-3 text-sm font-medium text-muted-foreground hidden sm:table-cell">Phone</th>
                  <th className="text-left px-6 py-3 text-sm font-medium text-muted-foreground hidden md:table-cell">Notes</th>
                  <th className="text-left px-6 py-3 text-sm font-medium text-muted-foreground hidden md:table-cell">Registered</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {registrations.map((reg) => (
                  <tr key={reg.id} className="hover:bg-muted/30 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-medium">
                          {reg.name.charAt(0).toUpperCase()}
                        </div>
                        <span className="font-medium text-foreground">{reg.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <a href={`mailto:${reg.email}`} className="text-sm text-primary hover:underline flex items-center gap-1.5">
                        <Mail size={14} />
                        {reg.email}
                      </a>
                    </td>
                    <td className="px-6 py-4 text-sm text-muted-foreground hidden sm:table-cell">
                      {reg.phone ? (
                        <a href={`tel:${reg.phone}`} className="flex items-center gap-1.5 hover:text-foreground">
                          <Phone size={14} />
                          {reg.phone}
                        </a>
                      ) : (
                        '—'
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm text-muted-foreground hidden md:table-cell max-w-[200px] truncate">
                      {reg.notes || '—'}
                    </td>
                    <td className="px-6 py-4 text-sm text-muted-foreground hidden md:table-cell">
                      <div className="flex items-center gap-1.5">
                        <Calendar size={14} />
                        {new Date(reg.created_at).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
