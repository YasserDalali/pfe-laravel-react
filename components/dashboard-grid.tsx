"use client"

import type React from "react"

import { TrendingUp } from "lucide-react"
import { Card } from "@/components/ui/card"

interface StatCard {
  icon: React.ComponentType<any>
  label: string
  value: string | number
  trend?: string
  color: string
}

interface DashboardGridProps {
  stats: StatCard[]
}

export default function DashboardGrid({ stats }: DashboardGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => {
        const Icon = stat.icon
        return (
          <Card
            key={index}
            className="p-6 border-violet-200 dark:border-violet-800 hover:border-violet-300 dark:hover:border-violet-700 transition-all hover:shadow-lg"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-sm text-muted-foreground mb-2">{stat.label}</p>
                <p className="text-3xl font-bold">{stat.value}</p>
                {stat.trend && (
                  <p className="text-xs text-green-600 dark:text-green-400 mt-2 flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" />
                    {stat.trend}
                  </p>
                )}
              </div>
              <div className={`p-3 rounded-lg ${stat.color}`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
            </div>
          </Card>
        )
      })}
    </div>
  )
}
