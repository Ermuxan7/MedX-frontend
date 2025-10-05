"use client"

import type React from "react"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Home, Users, BarChart3, Settings, LogOut, Menu } from "lucide-react"
import { useState } from "react"

const navigation = [
  { name: "Dashboard", href: "/admin/dashboard", icon: Home },
  { name: "Users", href: "/admin/users", icon: Users },
  { name: "Statistics", href: "/admin/statistics", icon: BarChart3 },
  { name: "Settings", href: "/admin/settings", icon: Settings },
]

export function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleLogout = () => {
    router.push("/login")
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 border-b md:border-r bg-background">
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b">
            <Link href="/admin/dashboard" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <div>
                <p className="font-semibold">MedX</p>
                <p className="text-xs text-muted-foreground">Admin Portal</p>
              </div>
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden p-4 border-b">
            <Button
              variant="outline"
              className="w-full bg-transparent"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Menu className="h-4 w-4 mr-2" />
              Menu
            </Button>
          </div>

          {/* Navigation */}
          <nav className={`flex-1 p-4 space-y-2 ${mobileMenuOpen ? "block" : "hidden md:block"}`}>
            {navigation.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(item.href + "/")
              return (
                <Link key={item.name} href={item.href}>
                  <Button
                    variant={isActive ? "secondary" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <item.icon className="h-4 w-4 mr-3" />
                    {item.name}
                  </Button>
                </Link>
              )
            })}
          </nav>

          {/* User Section */}
          <div className={`p-4 border-t ${mobileMenuOpen ? "block" : "hidden md:block"}`}>
            <div className="mb-3 p-3 bg-muted rounded-lg">
              <p className="font-medium text-sm">Admin User</p>
              <p className="text-xs text-muted-foreground">admin@example.com</p>
            </div>
            <Button variant="outline" className="w-full bg-transparent" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-8 bg-muted/20">{children}</main>
    </div>
  )
}
