"use client"

import { LabLayout } from "@/components/lab/lab-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import { TrendingUp, TrendingDown, Activity, FlaskConical } from "lucide-react"

const monthlyTests = [
  { month: "Yan", tests: 145 },
  { month: "Fev", tests: 168 },
  { month: "Mar", tests: 192 },
  { month: "Apr", tests: 178 },
  { month: "May", tests: 205 },
  { month: "Iyun", tests: 220 },
]

const bacteriaDistribution = [
  { name: "E. coli", value: 35, color: "#3b82f6" },
  { name: "S. aureus", value: 28, color: "#8b5cf6" },
  { name: "P. aeruginosa", value: 18, color: "#06b6d4" },
  { name: "K. pneumoniae", value: 12, color: "#10b981" },
  { name: "Boshqalar", value: 7, color: "#6b7280" },
]

const resistanceData = [
  { antibiotic: "Amoxicillin", resistant: 45, sensitive: 55 },
  { antibiotic: "Ciprofloxacin", resistant: 32, sensitive: 68 },
  { antibiotic: "Azithromycin", resistant: 28, sensitive: 72 },
  { antibiotic: "Ceftriaxone", resistant: 22, sensitive: 78 },
  { antibiotic: "Gentamicin", resistant: 18, sensitive: 82 },
]

export default function LabStatisticsPage() {
  return (
    <LabLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Statistika</h1>
          <p className="text-muted-foreground mt-2">Laboratoriya faoliyati va test natijalari tahlili</p>
        </div>

        {/* Summary Cards */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Jami testlar</CardTitle>
              <FlaskConical className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,108</div>
              <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                <TrendingUp className="h-3 w-3 text-green-600" />
                <span className="text-green-600">+12.5%</span> oldingi oyga nisbatan
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Oylik o'rtacha</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">185</div>
              <p className="text-xs text-muted-foreground">Test/oy</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Rezistentlik darajasi</CardTitle>
              <TrendingDown className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">29%</div>
              <p className="text-xs text-muted-foreground">O'rtacha rezistentlik</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Eng ko'p bakteriya</CardTitle>
              <FlaskConical className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">E. coli</div>
              <p className="text-xs text-muted-foreground">35% barcha testlardan</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="monthly" className="space-y-4">
          <TabsList>
            <TabsTrigger value="monthly">Oylik testlar</TabsTrigger>
            <TabsTrigger value="bacteria">Bakteriyalar</TabsTrigger>
            <TabsTrigger value="resistance">Rezistentlik</TabsTrigger>
          </TabsList>

          <TabsContent value="monthly" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Oylik test statistikasi</CardTitle>
                <CardDescription>So'nggi 6 oyda bajarilgan testlar soni</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                  <LineChart data={monthlyTests}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="tests" stroke="#3b82f6" strokeWidth={2} name="Testlar soni" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="bacteria" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Bakteriyalar taqsimoti</CardTitle>
                <CardDescription>Aniqlangan bakteriyalar bo'yicha statistika</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={bacteriaDistribution}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {bacteriaDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="space-y-3">
                    {bacteriaDistribution.map((bacteria) => (
                      <div key={bacteria.name} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-4 h-4 rounded" style={{ backgroundColor: bacteria.color }} />
                          <span className="font-medium">{bacteria.name}</span>
                        </div>
                        <span className="text-muted-foreground">{bacteria.value}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="resistance" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Antibiotiklarga rezistentlik</CardTitle>
                <CardDescription>Turli antibiotiklarga sezgirlik va rezistentlik nisbati</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                  <BarChart data={resistanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="antibiotic" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="sensitive" fill="#10b981" name="Sezgir (%)" />
                    <Bar dataKey="resistant" fill="#ef4444" name="Rezistent (%)" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </LabLayout>
  )
}
