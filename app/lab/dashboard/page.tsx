"use client"

import { LabLayout } from "@/components/lab/lab-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FlaskConical, Clock, CheckCircle, Send } from "lucide-react"
import Link from "next/link"

const stats = [
  { label: "Kutilayotgan testlar", value: "12", icon: Clock, trend: "Bugun +3" },
  { label: "Bugun bajarildi", value: "8", icon: CheckCircle, trend: "Rejada" },
  { label: "Bu oyda jami", value: "156", icon: FlaskConical, trend: "+12%" },
  { label: "Yuborilgan natijalar", value: "148", icon: Send, trend: "94.9%" },
]

const pendingTests = [
  {
    id: 1,
    patientName: "Alisher Karimov",
    patientId: "P-2025-001",
    testType: "Antibiotiklarga sezgirlik testi",
    sampleType: "Qon kultura",
    receivedDate: "2025-01-15",
    priority: "high",
  },
  {
    id: 2,
    patientName: "Dilnoza Rashidova",
    patientId: "P-2025-002",
    testType: "Siydik kultura",
    sampleType: "Siydik",
    receivedDate: "2025-01-15",
    priority: "normal",
  },
  {
    id: 3,
    patientName: "Bobur Tursunov",
    patientId: "P-2025-003",
    testType: "Antibiotiklarga sezgirlik testi",
    sampleType: "Yara tampon",
    receivedDate: "2025-01-14",
    priority: "high",
  },
]

const recentResults = [
  {
    id: 4,
    patientName: "Malika Abdullayeva",
    testType: "Antibiotiklarga sezgirlik testi",
    completedDate: "2025-01-15",
    status: "sent",
  },
  {
    id: 5,
    patientName: "Sardor Yusupov",
    testType: "Qon kultura",
    completedDate: "2025-01-15",
    status: "ready",
  },
]

export default function LabDashboard() {
  return (
    <LabLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Bosh sahifa</h1>
            <p className="text-muted-foreground">Xush kelibsiz, Markaziy tibbiy laboratoriya</p>
          </div>
          <Link href="/lab/tests/new">
            <Button>
              <FlaskConical className="h-4 w-4 mr-2" />
              Yangi test natijasi
            </Button>
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <Card key={stat.label}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.label}</CardTitle>
                <stat.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">{stat.trend}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Pending Tests */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Kutilayotgan testlar</CardTitle>
                <CardDescription>Natijalar kiritilishi kutilayotgan testlar</CardDescription>
              </div>
              <Link href="/lab/tests">
                <Button variant="outline" size="sm">
                  Barchasini ko'rish
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {pendingTests.map((test) => (
                <div key={test.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        test.priority === "high" ? "bg-red-100 dark:bg-red-900/30" : "bg-blue-100 dark:bg-blue-900/30"
                      }`}
                    >
                      <FlaskConical
                        className={`h-5 w-5 ${test.priority === "high" ? "text-red-600 dark:text-red-400" : "text-blue-600 dark:text-blue-400"}`}
                      />
                    </div>
                    <div>
                      <p className="font-medium">{test.patientName}</p>
                      <p className="text-sm text-muted-foreground">
                        {test.testType} • {test.sampleType}
                      </p>
                      <p className="text-xs text-muted-foreground">Qabul qilindi: {test.receivedDate}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {test.priority === "high" && <Badge variant="destructive">Yuqori ustuvorlik</Badge>}
                    <Link href={`/lab/tests/${test.id}/enter-results`}>
                      <Button size="sm">Natijalarni kiritish</Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Results */}
        <Card>
          <CardHeader>
            <CardTitle>So'nggi natijalar</CardTitle>
            <CardDescription>Yaqinda bajarilgan testlar</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentResults.map((result) => (
                <div key={result.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                      <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <p className="font-medium">{result.patientName}</p>
                      <p className="text-sm text-muted-foreground">{result.testType}</p>
                      <p className="text-xs text-muted-foreground">Bajarildi: {result.completedDate}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant={result.status === "sent" ? "default" : "secondary"}>
                      {result.status === "sent" ? "Yuborildi" : "Yuborishga tayyor"}
                    </Badge>
                    {result.status === "ready" && <Button size="sm">Natijalarni yuborish</Button>}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </LabLayout>
  )
}
