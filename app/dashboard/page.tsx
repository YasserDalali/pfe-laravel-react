import type { Metadata } from "next"
import { redirect } from "next/navigation"
import { getAuthUser, getAuthToken } from "@/lib/auth"
import AppNavbar from "@/components/app-navbar"
import DashboardGrid from "@/components/dashboard-grid"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BookOpen, Users, Zap } from "lucide-react"
import Link from "next/link"
import DashboardCharts from "@/components/dashboard-charts"

export const metadata: Metadata = {
  title: "Dashboard - Nexus",
  description: "Your research management dashboard",
}

export default async function DashboardPage() {
  const user = await getAuthUser()
  const token = await getAuthToken()

  if (!user || !token) {
    redirect("/login")
  }

  // Mock data - in production, fetch from API
  const stats = [
    {
      icon: BookOpen,
      label: "Total Publications",
      value: "487",
      trend: "+12% this month",
      color: "bg-violet-600",
    },
    {
      icon: Users,
      label: "Active Researchers",
      value: "52",
      trend: "+3% this month",
      color: "bg-purple-600",
    },
    {
      icon: Users,
      label: "Teams",
      value: "12",
      trend: "+1 this month",
      color: "bg-indigo-600",
    },
    {
      icon: Zap,
      label: "Engagement Rate",
      value: "94%",
      trend: "+2% this month",
      color: "bg-blue-600",
    },
  ]

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <AppNavbar user={user} />

      {/* Main Content */}
      <div className="flex-1 ml-64">
        <div className="p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="font-serif text-4xl font-bold mb-2">Welcome back, {user.name}!</h1>
            <p className="text-muted-foreground">Here's your research platform overview</p>
          </div>

          {/* Stats Grid */}
          <DashboardGrid stats={stats} />

          {/* Charts Section */}
          <DashboardCharts />

          {/* Quick Actions */}
          <Card className="p-8 border-violet-200 dark:border-violet-800">
            <h2 className="font-serif text-2xl font-bold mb-6">Quick Actions</h2>
            <div className="grid md:grid-cols-3 gap-4">
              <Link href="/publications?new=true">
                <Button
                  variant="outline"
                  className="w-full justify-start h-auto p-4 flex-col items-start gap-2 hover:bg-violet-50 dark:hover:bg-violet-950/50 bg-transparent"
                >
                  <BookOpen className="w-5 h-5 text-violet-600" />
                  <span className="font-semibold">Add Publication</span>
                  <span className="text-xs text-muted-foreground">Create a new publication entry</span>
                </Button>
              </Link>
              <Link href="/researchers?new=true">
                <Button
                  variant="outline"
                  className="w-full justify-start h-auto p-4 flex-col items-start gap-2 hover:bg-violet-50 dark:hover:bg-violet-950/50 bg-transparent"
                >
                  <Users className="w-5 h-5 text-violet-600" />
                  <span className="font-semibold">Invite Researcher</span>
                  <span className="text-xs text-muted-foreground">Add a team member</span>
                </Button>
              </Link>
              <Link href="/analytics">
                <Button
                  variant="outline"
                  className="w-full justify-start h-auto p-4 flex-col items-start gap-2 hover:bg-violet-50 dark:hover:bg-violet-950/50 bg-transparent"
                >
                  <Zap className="w-5 h-5 text-violet-600" />
                  <span className="font-semibold">View Analytics</span>
                  <span className="text-xs text-muted-foreground">Explore detailed insights</span>
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
