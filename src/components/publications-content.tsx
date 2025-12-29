"use client"
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from '@/store'
import { fetchPublications } from '@/store'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { BookOpen, Plus, Trash2, Edit2, Search } from 'lucide-react'
import type { Publication } from '@/lib/types/api'
import PublicationForm from '@/components/publication-form'

export default function PublicationsContent() {
  const dispatch = useDispatch<AppDispatch>()
  const { items: publications, loading: isLoading } = useSelector((s: RootState) => s.publications)
  const [filteredPublications, setFilteredPublications] = useState<Publication[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState<string>('all')
  const [showForm, setShowForm] = useState(false)

  useEffect(() => {
    dispatch(fetchPublications())
  }, [dispatch])

  useEffect(() => {
    let filtered = publications
    if (searchTerm) {
      filtered = filtered.filter((pub) => pub.title.toLowerCase().includes(searchTerm.toLowerCase()))
    }
    if (filterType !== 'all') {
      filtered = filtered.filter((pub) => pub.type === filterType)
    }
    setFilteredPublications(filtered)
  }, [publications, searchTerm, filterType])

  return (
    <div className="flex-1 ml-64">
      <div className="p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-serif text-4xl font-bold mb-2">Publications</h1>
            <p className="text-muted-foreground">Manage and explore all research publications</p>
          </div>
          <Button onClick={() => setShowForm(true)} className="bg-violet-600 hover:bg-violet-700 text-white gap-2">
            <Plus className="w-4 h-4" />
            New Publication
          </Button>
        </div>
        <Card className="p-6 mb-8 border-violet-200 dark:border-violet-800">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search publications..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-muted border-border"
              />
            </div>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-4 py-2 rounded-lg bg-muted border border-border"
            >
              <option value="all">All Types</option>
              <option value="conference">Conference</option>
              <option value="article">Article</option>
              <option value="chapter">Chapter</option>
            </select>
          </div>
        </Card>

        {showForm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <Card className="max-w-2xl w-full border-violet-200 dark:border-violet-800">
              <div className="p-6">
                <PublicationForm
                  onSuccess={() => {
                    setShowForm(false)
                  }}
                  onCancel={() => setShowForm(false)}
                />
              </div>
            </Card>
          </div>
        )}

        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <p className="text-muted-foreground">Loading publications...</p>
          </div>
        ) : filteredPublications.length > 0 ? (
          <div className="grid gap-6">
            {filteredPublications.map((pub) => (
              <Card key={pub.id} className="p-6 border-violet-200 dark:border-violet-800 hover:shadow-lg transition-all">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <BookOpen className="w-5 h-5 text-violet-600" />
                      <span className="text-xs font-semibold uppercase text-violet-600 dark:text-violet-400">{pub.type}</span>
                      <span className="text-xs text-muted-foreground">{pub.year}</span>
                    </div>
                    <h3 className="font-semibold text-lg mb-2 text-balance">{pub.title}</h3>
                    {pub.pdfUrl && (
                      <a href={pub.pdfUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-violet-600 hover:text-violet-700 underline">
                        View PDF
                      </a>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      <Edit2 className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="outline" className="text-destructive hover:text-destructive bg-transparent">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="p-12 text-center border-violet-200 dark:border-violet-800">
            <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
            <p className="text-muted-foreground mb-4">No publications found</p>
            <Button onClick={() => setShowForm(true)} className="bg-violet-600 hover:bg-violet-700 text-white">
              <Plus className="w-4 h-4 mr-2" />
              Create First Publication
            </Button>
          </Card>
        )}
      </div>
    </div>
  )
}
