"use client"

import { useState } from "react"
import Link from "next/link"
import { LabLayout } from "@/components/lab/lab-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Search, FlaskConical } from "lucide-react"

// Mock tests data
const pendingTests = [
  {
    id: 1,
    patientName: "Alisher Karimov",
    patientId: "P-2025-001",
    testType: "Antibiotic Sensitivity Test",
    sampleType: "Blood Culture",
    receivedDate: "2025-01-15",
    priority: "high",
  },
  {
    id: 2,
    patientName: "Dilnoza Rashidova",
    patientId: "P-2025-002",
    testType: "Urine Culture",
    sampleType: "Urine",
    receivedDate: "2025-01-15",
    priority: "normal",
  },
  {
    id: 3,
    patientName: "Bobur Tursunov",
    patientId: "P-2025-003",
    testType: "Antibiotic Sensitivity Test",
    sampleType: "Wound Swab",
    receivedDate: "2025-01-14",
    priority: "high",
  },
]

const completedTests = [
  {
    id: 4,
    patientName: "Malika Abdullayeva",
    patientId: "P-2025-004",
    testType: "Antibiotic Sensitivity Test",
    sampleType: "Blood Culture",
    completedDate: "2025-01-15",
    status: "sent",
  },
  {
    id: 5,
    patientName: "Sardor Yusupov",
    patientId: "P-2025-005",
    testType: "Blood Culture",
    sampleType: "Blood",
    completedDate: "2025-01-15",
    status: "ready",
  },
]

export default function TestsPage() {
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <LabLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Testlar</h1>
            <p className="text-muted-foreground">Barcha laboratoriya testlarini boshqarish</p>
          </div>
          <Link href="/lab/tests/new">
            <Button>
              <FlaskConical className="h-4 w-4 mr-2" />
              Yangi test natijasi
            </Button>
          </Link>
        </div>

        {/* Search */}
        <Card>
          <CardContent className="pt-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Bemor ismi yoki ID bo'yicha qidirish..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs defaultValue="pending" className="space-y-4">
          <TabsList>
            <TabsTrigger value="pending">Kutilmoqda ({pendingTests.length})</TabsTrigger>
            <TabsTrigger value="completed">Tugallangan ({completedTests.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="pending" className="space-y-4">
            {pendingTests.map((test) => (
              <Card key={test.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <div
                        className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                          test.priority === "high" ? "bg-red-100 dark:bg-red-900/30" : "bg-blue-100 dark:bg-blue-900/30"
                        }`}
                      >
                        <FlaskConical
                          className={`h-6 w-6 ${test.priority === "high" ? "text-red-600 dark:text-red-400" : "text-blue-600 dark:text-blue-400"}`}
                        />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{test.patientName}</CardTitle>
                        <CardDescription>Bemor ID: {test.patientId}</CardDescription>
                      </div>
                    </div>
                    {test.priority === "high" && <Badge variant="destructive">Yuqori ustuvorlik</Badge>}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Test turi</p>
                      <p className="font-medium">{test.testType}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Namuna turi</p>
                      <p className="font-medium">{test.sampleType}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Qabul qilingan sana</p>
                      <p className="font-medium">{test.receivedDate}</p>
                    </div>
                  </div>
                  <Link href={`/lab/tests/${test.id}/enter-results`}>
                    <Button className="w-full">Natijalarni kiritish</Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="completed" className="space-y-4">
            {completedTests.map((test) => (
              <Card key={test.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                        <FlaskConical className="h-6 w-6 text-green-600 dark:text-green-400" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{test.patientName}</CardTitle>
                        <CardDescription>Bemor ID: {test.patientId}</CardDescription>
                      </div>
                    </div>
                    <Badge variant={test.status === "sent" ? "default" : "secondary"}>
                      {test.status === "sent" ? "Yuborilgan" : "Yuborishga tayyor"}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Test turi</p>
                      <p className="font-medium">{test.testType}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Namuna turi</p>
                      <p className="font-medium">{test.sampleType}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Tugallangan sana</p>
                      <p className="font-medium">{test.completedDate}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" className="flex-1 bg-transparent">
                      Natijalarni ko'rish
                    </Button>
                    {test.status === "ready" && <Button className="flex-1">Natijalarni yuborish</Button>}
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </LabLayout>
  )
}
