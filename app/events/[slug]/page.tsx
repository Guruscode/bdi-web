import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { getEventBySlug } from '@/lib/events'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Calendar, Clock, Users, ArrowLeft, Tag } from 'lucide-react'
import EventRegistrationForm from './EventRegistrationForm'

export const dynamic = 'force-dynamic'

export default async function EventDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const event = await getEventBySlug(slug)

  if (!event) {
    notFound()
  }

  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const eventDate = new Date(event.date)
  const isPast = eventDate < today
  const registrationCount = (event as any).registration_count || 0
  const isFull = event.max_attendees ? registrationCount >= event.max_attendees : false

  return (
    <>
      <Header />
      <main className="bg-background">
        {/* Back Link */}
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 pt-8">
          <Link
            href="/events"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft size={16} />
            Back to Events
          </Link>
        </div>

        {/* Event Detail */}
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
            {/* Main Content */}
            <div className="lg:col-span-3 space-y-8">
              {/* Cover Image */}
              {event.cover_image && (
                <div className="aspect-[16/9] rounded-2xl overflow-hidden">
                  <img
                    src={event.cover_image}
                    alt={event.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              {/* Type & Category */}
              <div className="flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                  <Tag size={12} />
                  {event.type}
                </span>
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-muted text-muted-foreground text-sm">
                  {event.category}
                </span>
                {isPast && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-yellow-50 text-yellow-700 border border-yellow-200 text-sm font-medium">
                    Event Passed
                  </span>
                )}
              </div>

              {/* Title */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground text-balance">
                {event.title}
              </h1>

              {/* Description */}
              <div className="prose prose-lg max-w-none text-foreground/90">
                <p className="text-lg leading-relaxed whitespace-pre-line">
                  {event.description}
                </p>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-2">
              <div className="sticky top-24 space-y-6">
                {/* Event Info Card */}
                <div className="bg-white rounded-xl border border-border p-6 space-y-5">
                  <h2 className="text-lg font-semibold text-foreground">Event Details</h2>

                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Calendar size={18} className="text-primary mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-foreground">Date</p>
                        <p className="text-sm text-muted-foreground">
                          {eventDate.toLocaleDateString('en-US', {
                            weekday: 'long',
                            month: 'long',
                            day: 'numeric',
                            year: 'numeric',
                          })}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Clock size={18} className="text-primary mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-foreground">Time</p>
                        <p className="text-sm text-muted-foreground">{event.time}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Users size={18} className="text-primary mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-foreground">Attendees</p>
                        <p className="text-sm text-muted-foreground">
                          {registrationCount} registered
                          {event.max_attendees ? ` out of ${event.max_attendees} spots` : ''}
                        </p>
                      </div>
                    </div>
                  </div>

                  {event.max_attendees && (
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-muted-foreground">Capacity</span>
                        <span className="font-medium text-foreground">
                          {registrationCount} / {event.max_attendees}
                        </span>
                      </div>
                      <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all ${
                            isFull ? 'bg-destructive' : 'bg-primary'
                          }`}
                          style={{ width: `${Math.min((registrationCount / event.max_attendees) * 100, 100)}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Registration Card */}
                {!isPast && (
                  <div className="bg-white rounded-xl border border-border p-6">
                    <h2 className="text-lg font-semibold text-foreground mb-4">
                      {isFull ? 'Fully Booked' : 'Register for this Event'}
                    </h2>
                    {isFull ? (
                      <p className="text-sm text-muted-foreground">
                        This event has reached its maximum capacity. Check back in case spots open up.
                      </p>
                    ) : (
                      <EventRegistrationForm eventId={event.id} eventTitle={event.title} eventDate={event.date} eventTime={event.time} />
                    )}
                  </div>
                )}

                {isPast && (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 text-center">
                    <p className="text-yellow-700 font-medium">This event has already passed.</p>
                    <p className="text-yellow-600 text-sm mt-1">
                      Check out our upcoming events for more opportunities.
                    </p>
                    <Link
                      href="/events"
                      className="inline-block mt-3 text-sm text-primary hover:underline font-medium"
                    >
                      View Upcoming Events
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
