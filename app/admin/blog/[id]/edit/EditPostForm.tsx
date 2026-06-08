'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import { updatePost } from '@/lib/blog'
import { ArrowLeft, Save } from 'lucide-react'
import Link from 'next/link'
import type { BlogPost, Category } from '@/lib/blog'
import ImageUploader from '@/components/ImageUploader'

const TipTapEditor = dynamic(() => import('@/components/TipTapEditor'), {
  ssr: false,
  loading: () => (
    <div className="border border-border rounded-xl p-8 text-center text-muted-foreground bg-white">
      Loading editor...
    </div>
  ),
})

export default function EditPostForm({
  post,
  categories,
}: {
  post: BlogPost
  categories: Category[]
}) {
  const [title, setTitle] = useState(post.title)
  const [slug, setSlug] = useState(post.slug)
  const [content, setContent] = useState(post.content)
  const [excerpt, setExcerpt] = useState(post.excerpt || '')
  const [coverImage, setCoverImage] = useState(post.cover_image || '')
  const [published, setPublished] = useState(post.published === 1)
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    post.categories?.map((c) => String(c.id)) || []
  )
  const [loading, setLoading] = useState(false)

  function handleTitleChange(value: string) {
    setTitle(value)
    if (
      !slug ||
      slug === post.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
    ) {
      setSlug(
        value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
      )
    }
  }

  function toggleCategory(id: string) {
    setSelectedCategories((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    )
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData()
    formData.set('title', title)
    formData.set('slug', slug)
    formData.set('content', content)
    formData.set('excerpt', excerpt)
    formData.set('cover_image', coverImage)
    formData.set('published', published ? 'on' : 'off')
    selectedCategories.forEach((id) => formData.append('categories', id))

    await updatePost(post.id, formData)
  }

  return (
    <div className="p-6 sm:p-8 max-w-4xl">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Link
          href="/admin/blog"
          className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
        >
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Edit Post</h1>
          <p className="text-muted-foreground mt-1">Update your blog post</p>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title */}
        <div className="space-y-2">
          <label htmlFor="title" className="text-sm font-medium text-foreground">
            Title
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => handleTitleChange(e.target.value)}
            required
            placeholder="Enter post title"
            className="w-full px-4 py-2.5 rounded-lg border border-border bg-white focus:border-primary focus:outline-none transition-colors text-foreground"
          />
        </div>

        {/* Slug */}
        <div className="space-y-2">
          <label htmlFor="slug" className="text-sm font-medium text-foreground">
            Slug
          </label>
          <input
            id="slug"
            type="text"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            required
            placeholder="post-url-slug"
            className="w-full px-4 py-2.5 rounded-lg border border-border bg-white focus:border-primary focus:outline-none transition-colors text-foreground font-mono text-sm"
          />
          <p className="text-xs text-muted-foreground">
            The URL-friendly version of the title.
          </p>
        </div>

        {/* Excerpt */}
        <div className="space-y-2">
          <label htmlFor="excerpt" className="text-sm font-medium text-foreground">
            Excerpt
          </label>
          <textarea
            id="excerpt"
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            rows={2}
            placeholder="A short summary of the post (optional)"
            className="w-full px-4 py-2.5 rounded-lg border border-border bg-white focus:border-primary focus:outline-none transition-colors text-foreground resize-none"
          />
        </div>

        {/* Categories */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Categories</label>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => toggleCategory(String(cat.id))}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  selectedCategories.includes(String(cat.id))
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground hover:text-foreground hover:bg-border'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Cover Image */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Cover Image</label>
          <ImageUploader value={coverImage} onChange={setCoverImage} />
        </div>

        {/* Content - TipTap Editor */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Content</label>
          <TipTapEditor content={content} onChange={setContent} />
        </div>

        {/* Published Toggle */}
        <div className="flex items-center gap-3">
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={published}
              onChange={(e) => setPublished(e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-muted rounded-full peer peer-checked:bg-primary peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
          </label>
          <div>
            <p className="text-sm font-medium text-foreground">Published</p>
            <p className="text-xs text-muted-foreground">
              {published ? 'Visible on the public blog' : 'Saved as a draft'}
            </p>
          </div>
        </div>

        {/* Submit */}
        <div className="flex items-center gap-3 pt-4 border-t border-border">
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors disabled:opacity-50"
          >
            <Save size={18} />
            {loading ? 'Saving...' : 'Update Post'}
          </button>
          <Link
            href="/admin/blog"
            className="px-6 py-2.5 rounded-lg font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  )
}
