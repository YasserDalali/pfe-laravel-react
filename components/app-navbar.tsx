"use client"
import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { BookOpen, Users, BarChart3, LogOut, Home } from "lucide-react"
import { logoutUser } from "@/lib/auth-actions"
import type { Researcher } from "@/lib/types/api"

interface AppNavbarProps {
  user: Researcher
}

export default function AppNavbar({ user }: AppNavbarProps) {
  const router = useRouter()
  const pathname = usePathname()

  const navItems = [
    { href: "/dashboard", icon: Home, label: "Dashboard" },
    { href: "/publications", icon: BookOpen, label: "Publications" },
    { href: "/researchers", icon: Users, label: "Researchers" },
    { href: "/analytics", icon: BarChart3, label: "Analytics" },
  ]

  const isActive = (href: string) => pathname === href

  const handleLogout = async () => {
    await logoutUser()
  }

  return (
    <div className="fixed left-0 top-0 h-screen w-64 bg-card border-r border-border p-6 flex flex-col">
      {/* Brand */}
      <Link href="/dashboard" className="mb-12">
        <div className="font-serif text-2xl font-bold bg-gradient-to-r from-violet-600 to-violet-400 bg-clip-text text-transparent">
          Nexus
        </div>
      </Link>

      {/* Navigation */}
      <nav className="flex-1 space-y-2">
        {navItems.map((item) => (
          <Link key={item.href} href={item.href}>
            <div
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                isActive(item.href)
                  ? "bg-violet-100 dark:bg-violet-950 text-violet-600 dark:text-violet-400"
                  : "text-muted-foreground hover:bg-muted"
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </div>
          </Link>
        ))}
      </nav>

      {/* User Profile & Logout */}
      <div className="space-y-4 border-t border-border pt-4">
        <div className="px-4 py-3 bg-muted rounded-lg">
          <p className="text-xs text-muted-foreground">Logged in as</p>
          <p className="font-semibold text-sm truncate">{user.name}</p>
          <p className="text-xs text-muted-foreground truncate">{user.email}</p>
        </div>
        <Button variant="outline" className="w-full gap-2 bg-transparent" onClick={handleLogout}>
          <LogOut className="w-4 h-4" />
          Logout
        </Button>
      </div>
    </div>
  )
}
