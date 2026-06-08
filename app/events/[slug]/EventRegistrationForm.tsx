'use client'

import { useState } from 'react'
import { CheckCircle } from 'lucide-react'

export default function EventRegistrationForm({
  eventId,
  eventTitle,
  eventDate,
  eventTime,
}: {
  eventId: number
  eventTitle: string
  eventDate: string
  eventTime: string
}) {
  const [form, setForm] = useState({ name: '', email: '', phone: '', notes: '' })
  const [registering, setRegistering] = useState(false)
  const [registered, setRegistered] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setRegistering(true)
    setError('')

    try {
      const formData = new FormData()
      formData.set('event_id', String(eventId))
      formData.set('name', form.name)
      formData.set('email', form.email)
      formData.set('phone', form.phone)
      formData.set('notes', form.notes)

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
      setError(err instanceof Error ? err.message : 'Registration failed')
    } finally {
      setRegistering(false)
    }
  }

  if (registered) {
    return (
      <div className="text-center space-y-3 py-4">
        <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mx-auto">
          <CheckCircle size={24} className="text-green-600" />
        </div>
        <p className="font-semibold text-foreground">You&apos;re Registered!</p>
        <p className="text-sm text-muted-foreground">
          You&apos;ve successfully registered for <strong>{eventTitle}</strong>. We&apos;ll send the event details to your email.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-sm text-destructive">
          {error}
        </div>
      )}

      <div>
        <label htmlFor="name" className="text-sm font-medium text-foreground">Full Name</label>
        <input
          id="name"
          type="text"
          required
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="w-full px-4 py-2.5 rounded-lg border border-border bg-white focus:border-primary focus:outline-none transition-colors text-foreground mt-1"
          placeholder="Your full name"
        />
      </div>

      <div>
        <label htmlFor="email" className="text-sm font-medium text-foreground">Email</label>
        <input
          id="email"
          type="email"
          required
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="w-full px-4 py-2.5 rounded-lg border border-border bg-white focus:border-primary focus:outline-none transition-colors text-foreground mt-1"
          placeholder="your@email.com"
        />
      </div>

      <div>
        <label htmlFor="phone" className="text-sm font-medium text-foreground">Phone (optional)</label>
        <input
          id="phone"
          type="tel"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          className="w-full px-4 py-2.5 rounded-lg border border-border bg-white focus:border-primary focus:outline-none transition-colors text-foreground mt-1"
          placeholder="+1 234 567 890"
        />
      </div>

      <div>
        <label htmlFor="notes" className="text-sm font-medium text-foreground">Questions / Notes (optional)</label>
        <textarea
          id="notes"
          rows={3}
          value={form.notes}
          onChange={(e) => setForm({ ...form, notes: e.target.value })}
          className="w-full px-4 py-2.5 rounded-lg border border-border bg-white focus:border-primary focus:outline-none transition-colors text-foreground mt-1 resize-none"
          placeholder="Any questions or special requirements?"
        />
      </div>

      <button
        type="submit"
        disabled={registering}
        className="w-full px-4 py-2.5 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors disabled:opacity-50"
      >
        {registering ? 'Registering...' : 'Complete Registration'}
      </button>
    </form>
  )
}
