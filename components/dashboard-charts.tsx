"use client"

import { Card } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts"

const publicationsByYear = [
  { year: "2019", count: 28 },
  { year: "2020", count: 45 },
  { year: "2021", count: 62 },
  { year: "2022", count: 75 },
  { year: "2023", count: 89 },
  { year: "2024", count: 104 },
]

const researcherProductivity = [
  { month: "Jan", publications: 22 },
  { month: "Feb", publications: 31 },
  { month: "Mar", publications: 28 },
  { month: "Apr", publications: 39 },
  { month: "May", publications: 45 },
  { month: "Jun", publications: 52 },
]

export default function DashboardCharts() {
  return (
    <div className="grid lg:grid-cols-2 gap-6 mb-8">
      {/* Publications by Year */}
      <Card className="p-6 border-violet-200 dark:border-violet-800">
        <h3 className="font-semibold text-lg mb-4">Publications by Year</h3>
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
      </Card>

      {/* Researcher Productivity */}
      <Card className="p-6 border-violet-200 dark:border-violet-800">
        <h3 className="font-semibold text-lg mb-4">Researcher Productivity Trend</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={researcherProductivity}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
            <XAxis dataKey="month" stroke="var(--muted-foreground)" />
            <YAxis stroke="var(--muted-foreground)" />
            <Tooltip
              contentStyle={{
                backgroundColor: "var(--card)",
                border: "1px solid var(--border)",
                borderRadius: "8px",
              }}
            />
            <Line
              type="monotone"
              dataKey="publications"
              stroke="var(--primary)"
              strokeWidth={2}
              dot={{ fill: "var(--primary)" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </Card>
    </div>
  )
}
