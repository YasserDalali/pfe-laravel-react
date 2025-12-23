"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Trash2, Edit2, Search, UsersIcon } from "lucide-react"
import type { Team } from "@/lib/types/api"
import { getApiClient } from "@/lib/api-client"
import TeamForm from "@/components/team-form"

export default function TeamsContent() {
  const [teams, setTeams] = useState<Team[]>([])
  const [filteredTeams, setFilteredTeams] = useState<Team[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [showForm, setShowForm] = useState(false)

  useEffect(() => {
    async function loadTeams() {
      const client = getApiClient()
      const { data: teamList } = await client.GET("/teams")
      if (teamList) {
        setTeams(teamList)
      }
      setIsLoading(false)
    }

    loadTeams()
  }, [])

  useEffect(() => {
    if (searchTerm) {
      const filtered = teams.filter((t) => t.name.toLowerCase().includes(searchTerm.toLowerCase()))
      setFilteredTeams(filtered)
    } else {
      setFilteredTeams(teams)
    }
  }, [teams, searchTerm])

  return (
    <div className="flex-1 ml-64">
      <div className="p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-serif text-4xl font-bold mb-2">Teams</h1>
            <p className="text-muted-foreground">Manage research teams and collaborations</p>
          </div>
          <Button onClick={() => setShowForm(true)} className="bg-violet-600 hover:bg-violet-700 text-white gap-2">
            <Plus className="w-4 h-4" />
            New Team
          </Button>
        </div>

        {/* Search */}
        <Card className="p-6 mb-8 border-violet-200 dark:border-violet-800">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search teams..."
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
                <TeamForm onSuccess={() => setShowForm(false)} onCancel={() => setShowForm(false)} />
              </div>
            </Card>
          </div>
        )}

        {/* Teams Grid */}
        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <p className="text-muted-foreground">Loading teams...</p>
          </div>
        ) : filteredTeams.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTeams.map((team) => (
              <Card
                key={team.id}
                className="p-6 border-violet-200 dark:border-violet-800 hover:shadow-lg transition-all flex flex-col"
              >
                <div className="mb-4 flex items-center gap-3">
                  <div className="p-3 rounded-lg bg-violet-100 dark:bg-violet-950">
                    <UsersIcon className="w-6 h-6 text-violet-600 dark:text-violet-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{team.name}</h3>
                    <p className="text-sm text-muted-foreground">{team.memberCount || 0} members</p>
                  </div>
                </div>

                <div className="flex-1 py-4 border-t border-border border-b">
                  <p className="text-sm text-muted-foreground">Team ID: {team.id}</p>
                  {team.leadId && <p className="text-sm text-muted-foreground mt-1">Lead ID: {team.leadId}</p>}
                </div>

                <div className="flex gap-2 pt-4">
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
            <UsersIcon className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
            <p className="text-muted-foreground mb-4">No teams found</p>
            <Button onClick={() => setShowForm(true)} className="bg-violet-600 hover:bg-violet-700 text-white">
              <Plus className="w-4 h-4 mr-2" />
              Create First Team
            </Button>
          </Card>
        )}
      </div>
    </div>
  )
}
