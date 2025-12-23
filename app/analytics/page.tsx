"use client"

import { useEffect, useState } from "react"
import { redirect } from "next/navigation"
import AppNavbar from "@/components/app-navbar"
import { Card } from "@/components/ui/card"
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { getAuthUser, getAuthToken } from "@/lib/auth"
import type { Researcher, StatsByYearItem, StatsByGroupItem } from "@/lib/types/api"
import { getApiClient } from "@/lib/api-client"

async function getInitialData() {
  const user = await getAuthUser()
  const token = await getAuthToken()

  if (!user || !token) {
    redirect("/login")
  }

  return { user }
}

const COLORS = ["var(--primary)", "var(--chart-3)", "var(--chart-4)", "var(--chart-1)", "var(--chart-5)"]

export default function AnalyticsPage() {
  const [user, setUser] = useState<Researcher | null>(null)
  const [publicationsByYear, setPublicationsByYear] = useState<StatsByYearItem[]>([])
  const [publicationsByTeam, setPublicationsByTeam] = useState<StatsByGroupItem[]>([])
  const [publicationsByResearcher, setPublicationsByResearcher] = useState<StatsByGroupItem[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function initPage() {
      const { user: authUser } = await getInitialData()
      setUser(authUser)

      const client = getApiClient()

      const [yearData, teamData, researcherData] = await Promise.all([
        client.GET("/stats/publications-by-year"),
        client.GET("/stats/publications-by-team"),
        client.GET("/stats/publications-by-researcher"),
      ])

      if (yearData.data) setPublicationsByYear(yearData.data)
      if (teamData.data) setPublicationsByTeam(teamData.data)
      if (researcherData.data) setPublicationsByResearcher(researcherData.data)

      setIsLoading(false)
    }

    initPage()
  }, [])

  if (!user) return null

  return (
    <div className="flex min-h-screen bg-background">
      <AppNavbar user={user} />

      <div className="flex-1 ml-64">
        <div className="p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="font-serif text-4xl font-bold mb-2">Analytics</h1>
            <p className="text-muted-foreground">Comprehensive insights into your research platform</p>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center h-64">
              <p className="text-muted-foreground">Loading analytics...</p>
            </div>
          ) : (
            <div className="grid gap-6">
              {/* Publications by Year */}
              <Card className="p-6 border-violet-200 dark:border-violet-800">
                <h2 className="font-semibold text-xl mb-6">Publications by Year</h2>
                {publicationsByYear.length > 0 ? (
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={publicationsByYear}>
                      <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                      <XAxis dataKey="year" stroke="var(--muted-foreground)" />
                      <YAxis stroke="var(--muted-foreground)" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "var(--card)",
                          border: "1px solid var(--border)",
                          borderRadius: "8px",
                        }}
                      />
                      <Bar dataKey="count" fill="var(--primary)" radius={[8, 8, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <p className="text-muted-foreground text-center py-8">No data available</p>
                )}
              </Card>

              <div className="grid lg:grid-cols-2 gap-6">
                {/* Publications by Team */}
                <Card className="p-6 border-violet-200 dark:border-violet-800">
                  <h2 className="font-semibold text-xl mb-6">Publications by Team</h2>
                  {publicationsByTeam.length > 0 ? (
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={publicationsByTeam}
                          dataKey="count"
                          nameKey="name"
                          cx="50%"
                          cy="50%"
                          outerRadius={80}
                          label
                        >
                          {publicationsByTeam.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "var(--card)",
                            border: "1px solid var(--border)",
                            borderRadius: "8px",
                          }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  ) : (
                    <p className="text-muted-foreground text-center py-8">No data available</p>
                  )}
                </Card>

                {/* Top Researchers */}
                <Card className="p-6 border-violet-200 dark:border-violet-800">
                  <h2 className="font-semibold text-xl mb-6">Top Researchers</h2>
                  {publicationsByResearcher.length > 0 ? (
                    <div className="space-y-4">
                      {publicationsByResearcher.slice(0, 5).map((researcher, index) => (
                        <div key={researcher.id} className="flex items-center gap-4">
                          <div className="text-sm font-semibold text-muted-foreground min-w-6">#{index + 1}</div>
                          <div className="flex-1">
                            <p className="font-medium text-sm mb-1">{researcher.name}</p>
                            <div className="w-full bg-muted rounded-full h-2">
                              <div
                                className="bg-gradient-to-r from-violet-600 to-purple-600 h-2 rounded-full transition-all"
                                style={{
                                  width: `${(researcher.count / Math.max(...publicationsByResearcher.map((r) => r.count))) * 100}%`,
                                }}
                              />
                            </div>
                          </div>
                          <div className="text-sm font-semibold text-violet-600">{researcher.count}</div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted-foreground text-center py-8">No data available</p>
                  )}
                </Card>
              </div>

              {/* Team Stats Table */}
              {publicationsByTeam.length > 0 && (
                <Card className="p-6 border-violet-200 dark:border-violet-800">
                  <h2 className="font-semibold text-xl mb-6">Team Statistics</h2>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-border">
                          <th className="text-left py-3 px-4 font-semibold">Team Name</th>
                          <th className="text-right py-3 px-4 font-semibold">Publications</th>
                          <th className="text-right py-3 px-4 font-semibold">Percentage</th>
                        </tr>
                      </thead>
                      <tbody>
                        {publicationsByTeam.map((team) => {
                          const total = publicationsByTeam.reduce((sum, t) => sum + t.count, 0)
                          const percentage = ((team.count / total) * 100).toFixed(1)
                          return (
                            <tr key={team.id} className="border-b border-border hover:bg-muted transition-colors">
                              <td className="py-3 px-4">{team.name}</td>
                              <td className="text-right py-3 px-4 font-semibold">{team.count}</td>
                              <td className="text-right py-3 px-4">
                                <span className="px-3 py-1 rounded-full bg-violet-100 dark:bg-violet-950 text-violet-700 dark:text-violet-300 text-xs font-semibold">
                                  {percentage}%
                                </span>
                              </td>
                            </tr>
                          )
                        })}
                      </tbody>
                    </table>
                  </div>
                </Card>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
