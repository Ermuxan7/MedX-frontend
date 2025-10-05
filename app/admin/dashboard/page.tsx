"use client"

import { AdminLayout } from "@/components/admin/admin-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, FileText, FlaskConical, Building2, TrendingUp, Activity } from "lucide-react"
import { Bar, BarChart, Line, LineChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

// Mock data
const stats = [
  { label: "Total Users", value: "1,248", icon: Users, trend: "+12% from last month", color: "text-blue-600" },
  { label: "Prescriptions", value: "3,456", icon: FileText, trend: "+8% from last month", color: "text-green-600" },
  { label: "Lab Tests", value: "2,891", icon: FlaskConical, trend: "+15% from last month", color: "text-purple-600" },
  {
    label: "Active Pharmacies",
    value: "45",
    icon: Building2,
    trend: "+3 new this month",
    color: "text-orange-600",
  },
]

const usersByRole = [
  { role: "Doctors", count: 156, percentage: 12.5 },
  { role: "Patients", count: 892, percentage: 71.5 },
  { role: "Labs", count: 28, percentage: 2.2 },
  { role: "Pharmacies", count: 45, percentage: 3.6 },
  { role: "Admins", count: 8, percentage: 0.6 },
]

const monthlyData = [
  { month: "Jan", prescriptions: 2400, tests: 1800, users: 980 },
  { month: "Feb", prescriptions: 2800, tests: 2100, users: 1050 },
  { month: "Mar", prescriptions: 3100, tests: 2400, users: 1120 },
  { month: "Apr", prescriptions: 2900, tests: 2200, users: 1180 },
  { month: "May", prescriptions: 3300, tests: 2600, users: 1220 },
  { month: "Jun", prescriptions: 3456, tests: 2891, users: 1248 },
]

const resistanceData = [
  { antibiotic: "Amoxicillin", resistant: 45, sensitive: 55 },
  { antibiotic: "Ciprofloxacin", resistant: 28, sensitive: 72 },
  { antibiotic: "Vancomycin", resistant: 12, sensitive: 88 },
  { antibiotic: "Gentamicin", resistant: 22, sensitive: 78 },
  { antibiotic: "Erythromycin", resistant: 38, sensitive: 62 },
]

export default function AdminDashboard() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
          <p className="text-muted-foreground">System overview and statistics</p>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <Card key={stat.label}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.label}</CardTitle>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  <TrendingUp className="h-3 w-3" />
                  {stat.trend}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Charts Row */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Monthly Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Monthly Activity</CardTitle>
              <CardDescription>Prescriptions and lab tests over time</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  prescriptions: {
                    label: "Prescriptions",
                    color: "hsl(var(--chart-1))",
                  },
                  tests: {
                    label: "Lab Tests",
                    color: "hsl(var(--chart-2))",
                  },
                }}
                className="h-[300px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Line type="monotone" dataKey="prescriptions" stroke="var(--color-prescriptions)" strokeWidth={2} />
                    <Line type="monotone" dataKey="tests" stroke="var(--color-tests)" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Antibiotic Resistance */}
          <Card>
            <CardHeader>
              <CardTitle>Antibiotic Resistance Rates</CardTitle>
              <CardDescription>Percentage of resistant vs sensitive cases</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  resistant: {
                    label: "Resistant",
                    color: "hsl(var(--destructive))",
                  },
                  sensitive: {
                    label: "Sensitive",
                    color: "hsl(var(--chart-2))",
                  },
                }}
                className="h-[300px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={resistanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="antibiotic" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="resistant" fill="var(--color-resistant)" />
                    <Bar dataKey="sensitive" fill="var(--color-sensitive)" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>

        {/* Users by Role */}
        <Card>
          <CardHeader>
            <CardTitle>Users by Role</CardTitle>
            <CardDescription>Distribution of users across different roles</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {usersByRole.map((item) => (
                <div key={item.role} className="flex items-center justify-between">
                  <div className="flex items-center gap-3 flex-1">
                    <div className="w-24 font-medium">{item.role}</div>
                    <div className="flex-1 bg-muted rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-primary h-full rounded-full transition-all"
                        style={{ width: `${item.percentage}%` }}
                      />
                    </div>
                  </div>
                  <div className="flex items-center gap-4 w-32 justify-end">
                    <span className="text-sm text-muted-foreground">{item.percentage}%</span>
                    <span className="font-semibold w-16 text-right">{item.count}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* System Health */}
        <div className="grid md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">System Status</CardTitle>
              <Activity className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">Operational</div>
              <p className="text-xs text-muted-foreground">All systems running normally</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Uptime</CardTitle>
              <TrendingUp className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">99.9%</div>
              <p className="text-xs text-muted-foreground">Last 30 days</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Response Time</CardTitle>
              <Activity className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">124ms</div>
              <p className="text-xs text-muted-foreground">Average response time</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  )
}
