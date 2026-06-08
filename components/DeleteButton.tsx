'use client'

import { Trash2 } from 'lucide-react'

export function DeleteButton({ message = 'Are you sure you want to delete this?' }: { message?: string }) {
  return (
    <button
      type="submit"
      onClick={(e) => {
        if (!confirm(message)) {
          e.preventDefault()
        }
      }}
      className="p-2 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/5 transition-colors"
      title="Delete"
    >
      <Trash2 size={16} />
    </button>
  )
}
