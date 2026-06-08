'use client'

import { useCallback, useState } from 'react'
import { Upload, X, ImageIcon } from 'lucide-react'

interface ImageUploaderProps {
  value: string
  onChange: (url: string) => void
}

export default function ImageUploader({ value, onChange }: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')

  const handleUpload = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Please select an image file')
      return
    }

    // Validate file size (4MB)
    if (file.size > 4 * 1024 * 1024) {
      setError('Image must be less than 4MB')
      return
    }

    setUploading(true)
    setError('')

    try {
      const formData = new FormData()
      formData.append('file', file)

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })

      if (!res.ok) {
        const err = await res.json()
        throw new Error(err.error || 'Upload failed')
      }

      const data = await res.json()
      onChange(data.url)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed')
    } finally {
      setUploading(false)
    }
  }, [onChange])

  if (value) {
    return (
      <div className="relative aspect-[16/9] max-w-md rounded-lg overflow-hidden border border-border group">
        <img
          src={value}
          alt="Cover preview"
          className="w-full h-full object-cover"
        />
        <button
          type="button"
          onClick={() => onChange('')}
          className="absolute top-2 right-2 p-1.5 rounded-lg bg-black/50 text-white hover:bg-black/70 transition-colors opacity-0 group-hover:opacity-100"
        >
          <X size={16} />
        </button>
      </div>
    )
  }

  return (
    <div>
      <label className="flex flex-col items-center justify-center w-full max-w-md aspect-[16/9] rounded-lg border-2 border-dashed border-border bg-muted/30 hover:bg-muted/50 hover:border-primary/50 cursor-pointer transition-all">
        <div className="flex flex-col items-center gap-2 p-6 text-center">
          {uploading ? (
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
              <span className="text-sm text-muted-foreground">Uploading...</span>
            </div>
          ) : (
            <>
              <div className="p-3 rounded-full bg-primary/10">
                <Upload size={24} className="text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">
                  Click to upload cover image
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  PNG, JPG or WebP up to 4MB
                </p>
              </div>
            </>
          )}
        </div>
        <input
          type="file"
          accept="image/*"
          onChange={handleUpload}
          className="hidden"
          disabled={uploading}
        />
      </label>
      {error && (
        <p className="text-sm text-destructive mt-2">{error}</p>
      )}
    </div>
  )
}
