'use client'

import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { useState, useEffect, useMemo } from 'react'
import Link from 'next/link'
import { Calendar, Clock, Users, Filter, ArrowRight, X, CheckCircle, Tag } from 'lucide-react'
import type { Event } from '@/lib/events'

const categoryFilters = [
  { id: 'all', label: 'All Categories' },
  { id: 'career', label: 'Career Development' },
  { id: 'entrepreneurship', label: 'Entrepreneurship' },
  { id: 'networking', label: 'Networking' },
  { id: 'skills', label: 'Skills & Training' },
  { id: 'inspiration', label: 'Inspiration & Stories' },
  { id: 'wellbeing', label: 'Well-being' },
]

const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

export default function EventsPage() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [timeFilter, setTimeFilter] = useState<'all' | 'upcoming' | 'past'>('all')
  const [selectedMonth, setSelectedMonth] = useState<number | null>(null)
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const [registeringEvent, setRegisteringEvent] = useState<Event | null>(null)
  const [registerForm, setRegisterForm] = useState({ name: '', email: '', phone: '', notes: '' })
  const [registering, setRegistering] = useState(false)
  const [registered, setRegistered] = useState(false)
  const [registerError, setRegisterError] = useState('')

  // Load all published events
  useEffect(() => {
    async function loadEvents() {
      try {
        const res = await fetch('/api/events')
        if (res.ok) setEvents(await res.json())
      } catch {}
      setLoading(false)
    }
    loadEvents()
  }, [])

  // Get today's date at midnight for comparison
  const today = useMemo(() => {
    const d = new Date()
    d.setHours(0, 0, 0, 0)
    return d
  }, [])

  // Derive available months from events
  const availableMonths = useMemo(() => {
    const months = new Set<number>()
    events.forEach((e) => {
      const month = new Date(e.date).getMonth()
      months.add(month)
    })
    return Array.from(months).sort((a, b) => a - b)
  }, [events])

  // Filter events
  const filteredEvents = useMemo(() => {
    let filtered = [...events]

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter((e) => e.category === selectedCategory)
    }

    // Filter by time (upcoming vs past)
    if (timeFilter === 'upcoming') {
      filtered = filtered.filter((e) => new Date(e.date) >= today)
    } else if (timeFilter === 'past') {
      filtered = filtered.filter((e) => new Date(e.date) < today)
    }

    // Filter by specific month
    if (selectedMonth !== null) {
      filtered = filtered.filter((e) => new Date(e.date).getMonth() === selectedMonth)
    }

    return filtered
  }, [events, selectedCategory, timeFilter, selectedMonth, today])

  // Sort filtered events by date (most recent first)
  const sortedEvents = useMemo(() => {
    return [...filteredEvents].sort((a, b) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime()
    })
  }, [filteredEvents])

  function isPastEvent(date: string) {
    return new Date(date) < today
  }

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault()
    if (!registeringEvent) return
    setRegistering(true)
    setRegisterError('')

    try {
      const formData = new FormData()
      formData.set('event_id', String(registeringEvent.id))
      formData.set('name', registerForm.name)
      formData.set('email', registerForm.email)
      formData.set('phone', registerForm.phone)
      formData.set('notes', registerForm.notes)

      const res = await fetch('/api/events/register', {
        method: 'POST',
        body: formData,
      })

      if (!res.ok) {
        const err = await res.json()
        throw new Error(err.error || 'Registration failed')
      }

      setRegistered(true)
    } catch (err) {
      setRegisterError(err instanceof Error ? err.message : 'Registration failed')
    } finally {
      setRegistering(false)
    }
  }

  function openRegistration(event: Event) {
    setRegisteringEvent(event)
    setRegistered(false)
    setRegisterForm({ name: '', email: '', phone: '', notes: '' })
    setRegisterError('')
  }

  return (
    <>
      <Header />
      <main className="bg-background">
        {/* Hero Section */}
        <section className="py-20 sm:py-32 bg-muted/30 border-b border-border">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-6">
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground text-balance">
                Our Events
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl text-pretty">
                Join us for webinars, workshops, and networking events designed to help you grow professionally and connect with the community.
              </p>
            </div>
          </div>
        </section>

        {/* Events Section */}
        <section className="py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {/* Filters */}
            <div className="mb-12 space-y-6">
              {/* Time Filter */}
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <Filter size={20} className="text-primary" />
                  <h2 className="text-lg font-semibold text-foreground">Show</h2>
                </div>
                <div className="flex flex-wrap gap-3">
                  {[
                    { id: 'all' as const, label: 'All Events' },
                    { id: 'upcoming' as const, label: 'Upcoming' },
                    { id: 'past' as const, label: 'Past Events' },
                  ].map((filter) => (
                    <button
                      key={filter.id}
                      onClick={() => { setTimeFilter(filter.id); setSelectedMonth(null) }}
                      className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                        timeFilter === filter.id && selectedMonth === null
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted text-foreground hover:border-primary border border-border'
                      }`}
                    >
                      {filter.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Month Filter */}
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-3">Filter by Month</h3>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setSelectedMonth(null)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      selectedMonth === null && timeFilter === 'all'
                        ? 'bg-primary/10 text-primary'
                        : 'bg-muted text-muted-foreground hover:text-foreground hover:bg-border'
                    }`}
                  >
                    All Months
                  </button>
                  {availableMonths.map((month) => (
                    <button
                      key={month}
                      onClick={() => { setSelectedMonth(month); setTimeFilter('all') }}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                        selectedMonth === month
                          ? 'bg-primary/10 text-primary'
                          : 'bg-muted text-muted-foreground hover:text-foreground hover:bg-border'
                      }`}
                    >
                      {monthNames[month]}
                    </button>
                  ))}
                </div>
              </div>

              {/* Category Filter */}
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-3">Filter by Category</h3>
                <div className="flex flex-wrap gap-2">
                  {categoryFilters.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                        selectedCategory === cat.id
                          ? 'bg-primary/10 text-primary'
                          : 'bg-muted text-muted-foreground hover:text-foreground hover:bg-border'
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Events */}
            {loading ? (
              <div className="text-center py-12">
                <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
              </div>
            ) : sortedEvents.length === 0 ? (
              <div className="text-center py-20 space-y-4">
                <Calendar size={48} className="mx-auto text-muted-foreground/30" />
                <p className="text-muted-foreground text-lg">No events found matching your filters.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sortedEvents.map((event) => {
                  const registrationCount = (event as any).registration_count || 0
                  const isFull = event.max_attendees ? registrationCount >= event.max_attendees : false
                  const past = isPastEvent(event.date)

                  return (
                    <Link
                      key={event.id}
                      href={`/events/${event.slug}`}
                      className={`block p-6 rounded-xl bg-white border transition-all group cursor-pointer ${
                        past
                          ? 'border-border opacity-75 hover:opacity-100'
                          : 'border-border hover:border-primary/50 hover:shadow-lg'
                      }`}
                    >
                      {/* Type Badge */}
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                        {past && <Tag size={12} />}
                        {past ? 'Past Event' : event.type}
                      </div>

                      {/* Title */}
                      <h3 className={`text-lg font-semibold mb-3 ${past ? 'text-muted-foreground' : 'text-foreground group-hover:text-primary transition-colors'}`}>
                        {event.title}
                      </h3>

                      {/* Description */}
                      <p className="text-sm text-muted-foreground mb-4 leading-relaxed line-clamp-3">
                        {event.description}
                      </p>

                      {/* Event Details */}
                      <div className="space-y-2 mb-4 pb-4 border-b border-border">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar size={16} />
                          <span>
                            {new Date(event.date).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric',
                            })}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Clock size={16} />
                          <span>{event.time}</span>
                        </div>
                        {!past && (
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Users size={16} />
                            <span>
                              {registrationCount} attending
                              {event.max_attendees ? ` / ${event.max_attendees}` : ''}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Action Button */}
                      {past ? (
                        <div className="w-full px-4 py-2 rounded-lg bg-muted text-muted-foreground font-medium text-center text-sm">
                          Event Passed
                        </div>
                      ) : (
                        <button
                          onClick={(e) => {
                            e.preventDefault()
                            openRegistration(event)
                          }}
                          disabled={isFull}
                          className="w-full px-4 py-2 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {isFull ? 'Fully Booked' : 'Register Now'}
                          <ArrowRight size={16} />
                        </button>
                      )}
                    </Link>
                  )
                })}
              </div>
            )}
          </div>
        </section>

        {/* Registration Modal */}
        {registeringEvent && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={() => setRegisteringEvent(null)}>
            <div className="bg-white rounded-2xl max-w-md w-full p-6 sm:p-8 shadow-xl" onClick={(e) => e.stopPropagation()}>
              {registered ? (
                <div className="text-center space-y-4 py-4">
                  <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto">
                    <CheckCircle size={32} className="text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground">You&apos;re Registered!</h3>
                  <p className="text-muted-foreground">
                    You&apos;ve successfully registered for <strong>{registeringEvent.title}</strong>.
                    We&apos;ll send the event details to your email.
                  </p>
                  <button
                    onClick={() => setRegisteringEvent(null)}
                    className="px-6 py-2.5 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
                  >
                    Done
                  </button>
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-foreground">Register for Event</h3>
                    <button onClick={() => setRegisteringEvent(null)} className="p-1 hover:bg-muted rounded-lg transition-colors">
                      <X size={20} className="text-muted-foreground" />
                    </button>
                  </div>

                  <div className="mb-6 p-4 rounded-lg bg-muted/30 border border-border">
                    <p className="font-semibold text-foreground">{registeringEvent.title}</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      {new Date(registeringEvent.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })} &middot; {registeringEvent.time}
                    </p>
                  </div>

                  {registerError && (
                    <div className="mb-4 p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-sm text-destructive">
                      {registerError}
                    </div>
                  )}

                  <form onSubmit={handleRegister} className="space-y-4">
                    <div>
                      <label htmlFor="reg-name" className="text-sm font-medium text-foreground">Full Name</label>
                      <input id="reg-name" type="text" required value={registerForm.name}
                        onChange={(e) => setRegisterForm({ ...registerForm, name: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-lg border border-border bg-white focus:border-primary focus:outline-none transition-colors text-foreground mt-1" />
                    </div>
                    <div>
                      <label htmlFor="reg-email" className="text-sm font-medium text-foreground">Email</label>
                      <input id="reg-email" type="email" required value={registerForm.email}
                        onChange={(e) => setRegisterForm({ ...registerForm, email: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-lg border border-border bg-white focus:border-primary focus:outline-none transition-colors text-foreground mt-1" />
                    </div>
                    <div>
                      <label htmlFor="reg-phone" className="text-sm font-medium text-foreground">Phone (optional)</label>
                      <input id="reg-phone" type="tel" value={registerForm.phone}
                        onChange={(e) => setRegisterForm({ ...registerForm, phone: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-lg border border-border bg-white focus:border-primary focus:outline-none transition-colors text-foreground mt-1" />
                    </div>
                    <div>
                      <label htmlFor="reg-notes" className="text-sm font-medium text-foreground">Questions / Notes (optional)</label>
                      <textarea id="reg-notes" rows={3} value={registerForm.notes}
                        onChange={(e) => setRegisterForm({ ...registerForm, notes: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-lg border border-border bg-white focus:border-primary focus:outline-none transition-colors text-foreground mt-1 resize-none" />
                    </div>
                    <button type="submit" disabled={registering}
                      className="w-full px-4 py-2.5 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors disabled:opacity-50">
                      {registering ? 'Registering...' : 'Complete Registration'}
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        )}
      </main>
      <Footer />
    </>
  )
}
