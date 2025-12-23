"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Trash2, Edit2, Search, Mail, Award } from "lucide-react"
import type { Researcher } from "@/lib/types/api"
import { getApiClient } from "@/lib/api-client"
import ResearcherForm from "@/components/researcher-form"

export default function ResearchersContent() {
  const [researchers, setResearchers] = useState<Researcher[]>([])
  const [filteredResearchers, setFilteredResearchers] = useState<Researcher[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [showForm, setShowForm] = useState(false)

  useEffect(() => {
    async function loadResearchers() {
      const client = getApiClient()
      const { data: res } = await client.GET("/researchers")
      if (res) {
        setResearchers(res)
      }
      setIsLoading(false)
    }

    loadResearchers()
  }, [])

  useEffect(() => {
    if (searchTerm) {
      const filtered = researchers.filter(
        (r) =>
          r.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          r.email.toLowerCase().includes(searchTerm.toLowerCase()),
      )
      setFilteredResearchers(filtered)
    } else {
      setFilteredResearchers(researchers)
    }
  }, [researchers, searchTerm])

  return (
    <div className="flex-1 ml-64">
      <div className="p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-serif text-4xl font-bold mb-2">Researchers</h1>
            <p className="text-muted-foreground">Manage your research team members</p>
          </div>
          <Button onClick={() => setShowForm(true)} className="bg-violet-600 hover:bg-violet-700 text-white gap-2">
            <Plus className="w-4 h-4" />
            Add Researcher
          </Button>
        </div>

        {/* Search */}
        <Card className="p-6 mb-8 border-violet-200 dark:border-violet-800">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-muted border-border"
            />
          </div>
        </Card>

        {/* Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <Card className="max-w-2xl w-full border-violet-200 dark:border-violet-800">
              <div className="p-6">
                <ResearcherForm onSuccess={() => setShowForm(false)} onCancel={() => setShowForm(false)} />
              </div>
            </Card>
          </div>
        )}

        {/* Researchers Grid */}
        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <p className="text-muted-foreground">Loading researchers...</p>
          </div>
        ) : filteredResearchers.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResearchers.map((researcher) => (
              <Card
                key={researcher.id}
                className="p-6 border-violet-200 dark:border-violet-800 hover:shadow-lg transition-all"
              >
                <div className="mb-4 flex items-start justify-between">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-violet-400 to-purple-600 flex items-center justify-center text-white font-bold text-lg">
                    {researcher.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-xs font-semibold uppercase px-2 py-1 rounded-full bg-violet-100 dark:bg-violet-950 text-violet-600 dark:text-violet-400">
                    {researcher.role}
                  </span>
                </div>

                <h3 className="font-semibold text-lg mb-1">{researcher.name}</h3>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Mail className="w-4 h-4" />
                    <a href={`mailto:${researcher.email}`} className="hover:text-violet-600 truncate">
                      {researcher.email}
                    </a>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Award className="w-4 h-4" />
                    {researcher.grade}
                  </div>
                </div>

                <div className="flex gap-2 pt-4 border-t border-border">
                  <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                    <Edit2 className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1 text-destructive hover:text-destructive bg-transparent"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="p-12 text-center border-violet-200 dark:border-violet-800">
            <Award className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
            <p className="text-muted-foreground mb-4">No researchers found</p>
            <Button onClick={() => setShowForm(true)} className="bg-violet-600 hover:bg-violet-700 text-white">
              <Plus className="w-4 h-4 mr-2" />
              Add First Researcher
            </Button>
          </Card>
        )}
      </div>
    </div>
  )
}
