'use client'

import { useState } from 'react'
import { createEvent } from '@/lib/events'
import { ArrowLeft, Save, Calendar, Clock } from 'lucide-react'
import Link from 'next/link'
import ImageUploader from '@/components/ImageUploader'

const eventTypes = ['Webinar', 'Workshop', 'Networking', 'Panel', 'Discussion', 'Masterclass']
const categories = [
  { id: 'career', label: 'Career Development' },
  { id: 'entrepreneurship', label: 'Entrepreneurship' },
  { id: 'networking', label: 'Networking' },
  { id: 'skills', label: 'Skills & Training' },
  { id: 'inspiration', label: 'Inspiration & Stories' },
  { id: 'wellbeing', label: 'Well-being' },
]

export default function NewEventPage() {
  const [title, setTitle] = useState('')
  const [slug, setSlug] = useState('')
  const [published, setPublished] = useState(false)
  const [loading, setLoading] = useState(false)
  const [coverImage, setCoverImage] = useState('')

  function handleTitleChange(value: string) {
    setTitle(value)
    const autoSlug = value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
    if (!slug || slug === title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')) {
      setSlug(autoSlug)
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    const formData = new FormData(e.currentTarget)
    await createEvent(formData)
  }

  return (
    <div className="p-6 sm:p-8 max-w-4xl">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/events" className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">New Event</h1>
          <p className="text-muted-foreground mt-1">Create a new community event</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title */}
        <div className="space-y-2">
          <label htmlFor="title" className="text-sm font-medium text-foreground">Title</label>
          <input id="title" name="title" type="text" value={title} onChange={(e) => handleTitleChange(e.target.value)} required
            placeholder="Enter event title" className="w-full px-4 py-2.5 rounded-lg border border-border bg-white focus:border-primary focus:outline-none transition-colors text-foreground" />
        </div>

        {/* Slug */}
        <div className="space-y-2">
          <label htmlFor="slug" className="text-sm font-medium text-foreground">Slug</label>
          <input id="slug" name="slug" type="text" value={slug} onChange={(e) => setSlug(e.target.value)} required
            placeholder="event-url-slug" className="w-full px-4 py-2.5 rounded-lg border border-border bg-white focus:border-primary focus:outline-none transition-colors text-foreground font-mono text-sm" />
        </div>

        {/* Date & Time */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label htmlFor="date" className="text-sm font-medium text-foreground flex items-center gap-2">
              <Calendar size={14} /> Date
            </label>
            <input id="date" name="date" type="date" required
              className="w-full px-4 py-2.5 rounded-lg border border-border bg-white focus:border-primary focus:outline-none transition-colors text-foreground" />
          </div>
          <div className="space-y-2">
            <label htmlFor="time" className="text-sm font-medium text-foreground flex items-center gap-2">
              <Clock size={14} /> Time
            </label>
            <input id="time" name="time" type="text" required placeholder="e.g. 2:00 PM UTC"
              className="w-full px-4 py-2.5 rounded-lg border border-border bg-white focus:border-primary focus:outline-none transition-colors text-foreground" />
          </div>
        </div>

        {/* Type & Category */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label htmlFor="type" className="text-sm font-medium text-foreground">Type</label>
            <select id="type" name="type" required
              className="w-full px-4 py-2.5 rounded-lg border border-border bg-white focus:border-primary focus:outline-none transition-colors text-foreground">
              {eventTypes.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
          <div className="space-y-2">
            <label htmlFor="category" className="text-sm font-medium text-foreground">Category</label>
            <select id="category" name="category" required
              className="w-full px-4 py-2.5 rounded-lg border border-border bg-white focus:border-primary focus:outline-none transition-colors text-foreground">
              {categories.map((c) => <option key={c.id} value={c.id}>{c.label}</option>)}
            </select>
          </div>
        </div>

        {/* Max Attendees */}
        <div className="space-y-2">
          <label htmlFor="max_attendees" className="text-sm font-medium text-foreground">Max Attendees (optional)</label>
          <input id="max_attendees" name="max_attendees" type="number" min="1"
            placeholder="Leave empty for unlimited"
            className="w-full px-4 py-2.5 rounded-lg border border-border bg-white focus:border-primary focus:outline-none transition-colors text-foreground" />
        </div>

        {/* Cover Image */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Cover Image</label>
          <ImageUploader value={coverImage} onChange={setCoverImage} />
          <input type="hidden" name="cover_image" value={coverImage} />
        </div>

        {/* Description */}
        <div className="space-y-2">
          <label htmlFor="description" className="text-sm font-medium text-foreground">Description</label>
          <textarea id="description" name="description" required rows={5}
            placeholder="Describe the event..."
            className="w-full px-4 py-3 rounded-lg border border-border bg-white focus:border-primary focus:outline-none transition-colors text-foreground resize-y" />
        </div>

        {/* Published Toggle */}
        <div className="flex items-center gap-3">
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" name="published" checked={published} onChange={(e) => setPublished(e.target.checked)} className="sr-only peer" />
            <div className="w-11 h-6 bg-muted rounded-full peer peer-checked:bg-primary peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
          </label>
          <div>
            <p className="text-sm font-medium text-foreground">Publish immediately</p>
            <p className="text-xs text-muted-foreground">Uncheck to save as a draft</p>
          </div>
        </div>

        {/* Submit */}
        <div className="flex items-center gap-3 pt-4 border-t border-border">
          <button type="submit" disabled={loading}
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors disabled:opacity-50">
            <Save size={18} /> {loading ? 'Saving...' : 'Save Event'}
          </button>
          <Link href="/admin/events" className="px-6 py-2.5 rounded-lg font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">Cancel</Link>
        </div>
      </form>
    </div>
  )
}
