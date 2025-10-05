"use client"

import { DoctorLayout } from "@/components/doctor/doctor-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Users, FileText, TrendingUp, Calendar, AlertCircle, CheckCircle2 } from "lucide-react"
import {
  Bar,
  BarChart,
  Line,
  LineChart,
  Pie,
  PieChart,
  Cell,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

// Mock data
const monthlyPatientsData = [
  { month: "Yan", patients: 45 },
  { month: "Fev", patients: 52 },
  { month: "Mar", patients: 48 },
  { month: "Apr", patients: 61 },
  { month: "May", patients: 55 },
  { month: "Iyun", patients: 67 },
]

const prescriptionsData = [
  { month: "Yan", count: 38 },
  { month: "Fev", count: 45 },
  { month: "Mar", count: 41 },
  { month: "Apr", count: 53 },
  { month: "May", count: 48 },
  { month: "Iyun", count: 59 },
]

const antibioticsUsageData = [
  { name: "Ciprofloxacin", value: 28, color: "#3b82f6" },
  { name: "Amoxicillin", value: 22, color: "#10b981" },
  { name: "Azithromycin", value: 18, color: "#f59e0b" },
  { name: "Levofloxacin", value: 15, color: "#8b5cf6" },
  { name: "Boshqalar", value: 17, color: "#6b7280" },
]

const resistanceData = [
  { antibiotic: "Ciprofloxacin", sensitive: 75, resistant: 25 },
  { antibiotic: "Amoxicillin", sensitive: 68, resistant: 32 },
  { antibiotic: "Azithromycin", sensitive: 82, resistant: 18 },
  { antibiotic: "Levofloxacin", sensitive: 71, resistant: 29 },
]

export default function StatisticsPage() {
  return (
    <DoctorLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold">Statistika</h1>
          <p className="text-muted-foreground">Faoliyatingiz va davolash natijalaringizni tahlil qiling</p>
        </div>

        {/* Overview Stats */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Jami Bemorlar</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">328</div>
              <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                <TrendingUp className="h-3 w-3 text-green-500" />
                <span className="text-green-500">+12%</span> o'tgan oyga nisbatan
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Yozilgan Retseptlar</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">284</div>
              <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                <TrendingUp className="h-3 w-3 text-green-500" />
                <span className="text-green-500">+8%</span> o'tgan oyga nisbatan
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Muvaffaqiyatli Davolash</CardTitle>
              <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">94%</div>
              <p className="text-xs text-muted-foreground mt-1">Bemorlar tuzalib ketgan</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">O'rtacha Davolash Muddati</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8.5 kun</div>
              <p className="text-xs text-muted-foreground mt-1">Antibiotik terapiyasi</p>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <Tabs defaultValue="patients" className="space-y-4">
          <TabsList>
            <TabsTrigger value="patients">Bemorlar</TabsTrigger>
            <TabsTrigger value="prescriptions">Retseptlar</TabsTrigger>
            <TabsTrigger value="antibiotics">Antibiotiklar</TabsTrigger>
            <TabsTrigger value="resistance">Rezistentlik</TabsTrigger>
          </TabsList>

          <TabsContent value="patients" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Oylik Bemorlar Statistikasi</CardTitle>
                <CardDescription>So'nggi 6 oyda qabul qilingan bemorlar soni</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    patients: {
                      label: "Bemorlar",
                      color: "hsl(var(--primary))",
                    },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={monthlyPatientsData}>
                      <XAxis dataKey="month" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Line type="monotone" dataKey="patients" stroke="hsl(var(--primary))" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="prescriptions" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Oylik Retseptlar Statistikasi</CardTitle>
                <CardDescription>So'nggi 6 oyda yozilgan retseptlar soni</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    count: {
                      label: "Retseptlar",
                      color: "hsl(var(--primary))",
                    },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={prescriptionsData}>
                      <XAxis dataKey="month" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="count" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="antibiotics" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Eng Ko'p Ishlatiladigan Antibiotiklar</CardTitle>
                <CardDescription>Retseptlarda eng ko'p tayinlangan antibiotiklar</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={antibioticsUsageData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {antibioticsUsageData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="resistance" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Antibiotiklarga Sezgirlik va Rezistentlik</CardTitle>
                <CardDescription>Laboratoriya testlari asosida antibiotiklarga javob</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    sensitive: {
                      label: "Sezgir",
                      color: "hsl(var(--primary))",
                    },
                    resistant: {
                      label: "Rezistent",
                      color: "hsl(var(--destructive))",
                    },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={resistanceData}>
                      <XAxis dataKey="antibiotic" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Legend />
                      <Bar dataKey="sensitive" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} />
                      <Bar dataKey="resistant" fill="hsl(var(--destructive))" radius={[8, 8, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>
                  <AlertCircle className="h-5 w-5 inline mr-2 text-amber-500" />
                  Rezistentlik Ogohlantirishi
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Amoxicillin ga rezistentlik darajasi 32% ga yetdi. Alternativ antibiotiklar ishlatishni ko'rib
                  chiqing.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Tavsiya etiladi: Azithromycin</span>
                    <span className="text-green-500 font-medium">82% sezgir</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>Tavsiya etiladi: Ciprofloxacin</span>
                    <span className="text-green-500 font-medium">75% sezgir</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DoctorLayout>
  )
}
