"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { AlertCircle, Loader2, X } from 'lucide-react'

interface PublicationFormProps {
  onSuccess: () => void
  onCancel: () => void
}

export default function PublicationForm({ onSuccess, onCancel }: PublicationFormProps) {
  const [formData, setFormData] = useState({
    title: '',
    year: new Date().getFullYear(),
    type: 'article',
    pdfUrl: '',
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)
    try {
      console.log('Creating publication:', formData)
      setIsLoading(false)
      onSuccess()
    } catch {
      setError('Failed to create publication')
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-serif text-2xl font-bold">New Publication</h2>
        <button onClick={onCancel} className="p-1 hover:bg-muted rounded-lg">
          <X className="w-5 h-5" />
        </button>
      </div>
      {error && (
        <div className="flex gap-3 p-4 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm">
          <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="text-sm font-medium block mb-2">Title *</label>
          <Input
            type="text"
            placeholder="Publication title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="bg-muted border-border"
            required
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium block mb-2">Year *</label>
            <Input
              type="number"
              value={formData.year}
              onChange={(e) => setFormData({ ...formData, year: Number.parseInt(e.target.value) })}
              className="bg-muted border-border"
              required
            />
          </div>
          <div>
            <label className="text-sm font-medium block mb-2">Type *</label>
            <select
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              className="w-full px-3 py-2 rounded-lg bg-muted border border-border"
            >
              <option value="article">Article</option>
              <option value="conference">Conference</option>
              <option value="chapter">Chapter</option>
            </select>
          </div>
        </div>
        <div>
          <label className="text-sm font-medium block mb-2">PDF URL</label>
          <Input
            type="url"
            placeholder="https://example.com/paper.pdf"
            value={formData.pdfUrl}
            onChange={(e) => setFormData({ ...formData, pdfUrl: e.target.value })}
            className="bg-muted border-border"
          />
        </div>
        <div className="flex gap-3 pt-4">
          <Button type="submit" disabled={isLoading} className="flex-1 bg-violet-600 hover:bg-violet-700 text-white">
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Creating...
              </>
            ) : (
              'Create Publication'
            )}
          </Button>
          <Button type="button" onClick={onCancel} variant="outline" className="flex-1 bg-transparent">
            Cancel
          </Button>
        </div>
      </form>
    </div>
  )
}

