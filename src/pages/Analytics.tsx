import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from '@/store'
import { fetchAnalytics } from '@/store'
import AppNavbar from '@/components/app-navbar'
import { Card } from '@/components/ui/card'
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { getAuthUser } from '@/lib/auth'
import type { StatsByYearItem, StatsByGroupItem } from '@/lib/types/api'

const COLORS = ['var(--primary)', 'var(--chart-3)', 'var(--chart-4)', 'var(--chart-1)', 'var(--chart-5)']

export default function Analytics() {
  const user = getAuthUser()
  const dispatch = useDispatch<AppDispatch>()
  const { byYear: publicationsByYear, byTeam: publicationsByTeam, byResearcher: publicationsByResearcher, loading: isLoading } =
    useSelector((s: RootState) => s.analytics)

  useEffect(() => {
    if (!user) return
    dispatch(fetchAnalytics())
  }, [dispatch, user])

  if (!user) return null

  return (
    <div className="flex min-h-screen bg-background">
      <AppNavbar user={user} />
      <div className="flex-1 ml-64">
        <div className="p-8">
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
                          backgroundColor: 'var(--card)',
                          border: '1px solid var(--border)',
                          borderRadius: '8px',
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
                <Card className="p-6 border-violet-200 dark:border-violet-800">
                  <h2 className="font-semibold text-xl mb-6">Publications by Team</h2>
                  {publicationsByTeam.length > 0 ? (
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie data={publicationsByTeam} dataKey="count" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                          {publicationsByTeam.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip
                          contentStyle={{
                            backgroundColor: 'var(--card)',
                            border: '1px solid var(--border)',
                            borderRadius: '8px',
                          }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  ) : (
                    <p className="text-muted-foreground text-center py-8">No data available</p>
                  )}
                </Card>
                <Card className="p-6 border-violet-200 dark:border-violet-800">
                  <h2 className="font-semibold text-xl mb-6">Publications by Researcher</h2>
                  {publicationsByResearcher.length > 0 ? (
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie data={publicationsByResearcher} dataKey="count" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                          {publicationsByResearcher.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip
                          contentStyle={{
                            backgroundColor: 'var(--card)',
                            border: '1px solid var(--border)',
                            borderRadius: '8px',
                          }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  ) : (
                    <p className="text-muted-foreground text-center py-8">No data available</p>
                  )}
                </Card>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
