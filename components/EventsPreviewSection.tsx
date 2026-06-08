'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Calendar, Clock, Users, ArrowRight } from 'lucide-react'
import { useState, useEffect } from 'react'
import type { Event } from '@/lib/events'

export function EventsPreviewSection() {
  const [events, setEvents] = useState<Event[]>([])

  useEffect(() => {
    async function loadEvents() {
      try {
        const res = await fetch('/api/events/upcoming')
        if (res.ok) setEvents(await res.json())
      } catch {}
    }
    loadEvents()
  }, [])

  if (events.length === 0) return null

  return (
    <section className="py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-12"
        >
          <div className="space-y-2">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground">Upcoming Events</h2>
            <p className="text-lg text-muted-foreground">Join our community events and grow together</p>
          </div>
          <Link
            href="/events"
            className="inline-flex items-center gap-2 text-primary font-semibold hover:text-primary/80 transition-colors whitespace-nowrap"
          >
            View All Events
            <ArrowRight size={20} />
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {events.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="p-6 rounded-xl bg-white border border-border hover:border-primary/50 hover:shadow-lg transition-all group cursor-pointer"
            >
              {/* Type Badge */}
              <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                {event.type}
              </div>

              {/* Title */}
              <h3 className="text-lg font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                {event.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-muted-foreground mb-4 leading-relaxed line-clamp-2">{event.description}</p>

              {/* Event Details */}
              <div className="space-y-2 mb-4 pb-4 border-b border-border">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar size={16} />
                  <span>{new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock size={16} />
                  <span>{event.time}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Users size={16} />
                  <span>{(event as any).registration_count || 0} attending</span>
                </div>
              </div>

              {/* Register Button */}
              <Link
                href="/events"
                className="w-full px-4 py-2 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors block text-center"
              >
                Register Now
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
