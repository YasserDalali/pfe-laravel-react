"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { AlertCircle, Loader2, X } from "lucide-react"

interface TeamFormProps {
  onSuccess: () => void
  onCancel: () => void
}

export default function TeamForm({ onSuccess, onCancel }: TeamFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    leadId: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      console.log("Creating team:", formData)
      setIsLoading(false)
      onSuccess()
    } catch (err) {
      setError("Failed to create team")
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-serif text-2xl font-bold">New Team</h2>
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
          <label className="text-sm font-medium block mb-2">Team Name *</label>
          <Input
            type="text"
            placeholder="Research Team Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="bg-muted border-border"
            required
          />
        </div>

        <div>
          <label className="text-sm font-medium block mb-2">Team Lead ID</label>
          <Input
            type="number"
            placeholder="Leave empty if no lead assigned yet"
            value={formData.leadId}
            onChange={(e) => setFormData({ ...formData, leadId: e.target.value })}
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
              "Create Team"
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
