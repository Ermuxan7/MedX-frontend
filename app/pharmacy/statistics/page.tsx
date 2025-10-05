"use client"

import { PharmacyLayout } from "@/components/pharmacy/pharmacy-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import { TrendingUp, Package, CheckCircle, Clock } from "lucide-react"

const monthlyDispensed = [
  { month: "Yan", dispensed: 234 },
  { month: "Fev", dispensed: 267 },
  { month: "Mar", dispensed: 298 },
  { month: "Apr", dispensed: 285 },
  { month: "May", dispensed: 312 },
  { month: "Iyun", dispensed: 345 },
]

const topMedications = [
  { name: "Amoxicillin", count: 145, trend: "+12%" },
  { name: "Ciprofloxacin", count: 128, trend: "+8%" },
  { name: "Azithromycin", count: 112, trend: "+15%" },
  { name: "Ceftriaxone", count: 98, trend: "+5%" },
  { name: "Doxycycline", count: 87, trend: "+10%" },
]

const hourlyActivity = [
  { hour: "08:00", prescriptions: 12 },
  { hour: "10:00", prescriptions: 28 },
  { hour: "12:00", prescriptions: 45 },
  { hour: "14:00", prescriptions: 38 },
  { hour: "16:00", prescriptions: 32 },
  { hour: "18:00", prescriptions: 25 },
  { hour: "20:00", prescriptions: 15 },
]

export default function PharmacyStatisticsPage() {
  return (
    <PharmacyLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Statistika</h1>
          <p className="text-muted-foreground mt-2">Dorixona faoliyati va retseptlar tahlili</p>
        </div>

        {/* Summary Cards */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Jami retseptlar</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,741</div>
              <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                <TrendingUp className="h-3 w-3 text-green-600" />
                <span className="text-green-600">+10.6%</span> oldingi oyga nisbatan
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Berilgan dorilar</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">1,689</div>
              <p className="text-xs text-muted-foreground">97% bajarildi</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Kutilmoqda</CardTitle>
              <Clock className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">52</div>
              <p className="text-xs text-muted-foreground">3% jarayonda</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Kunlik o'rtacha</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">58</div>
              <p className="text-xs text-muted-foreground">Retsept/kun</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="monthly" className="space-y-4">
          <TabsList>
            <TabsTrigger value="monthly">Oylik statistika</TabsTrigger>
            <TabsTrigger value="medications">Eng ko'p dorilar</TabsTrigger>
            <TabsTrigger value="hourly">Kunlik faollik</TabsTrigger>
          </TabsList>

          <TabsContent value="monthly" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Oylik berilgan dorilar</CardTitle>
                <CardDescription>So'nggi 6 oyda berilgan retseptlar soni</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                  <LineChart data={monthlyDispensed}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="dispensed"
                      stroke="#3b82f6"
                      strokeWidth={2}
                      name="Berilgan dorilar"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="medications" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Eng ko'p beriladigan dorilar</CardTitle>
                <CardDescription>Oxirgi oyda eng ko'p berilgan antibiotiklar</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topMedications.map((med, index) => (
                    <div key={med.name} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary">
                          {index + 1}
                        </div>
                        <div>
                          <p className="font-medium">{med.name}</p>
                          <p className="text-sm text-muted-foreground">{med.count} ta retsept</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-green-600">{med.trend}</p>
                        <p className="text-xs text-muted-foreground">o'sish</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="hourly" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Kunlik faollik grafigi</CardTitle>
                <CardDescription>Kun davomida retseptlar berilish vaqtlari</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                  <BarChart data={hourlyActivity}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="hour" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="prescriptions" fill="#3b82f6" name="Retseptlar soni" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </PharmacyLayout>
  )
}
