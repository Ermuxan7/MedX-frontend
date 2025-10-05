"use client"

import { useState } from "react"
import Link from "next/link"
import { PharmacyLayout } from "@/components/pharmacy/pharmacy-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Search, CheckCircle, Clock } from "lucide-react"

// Mock prescriptions data
const pendingPrescriptions = [
  {
    id: "RX-2025-002",
    patientName: "Dilnoza Rashidova",
    medication: "Amoxicillin 500mg",
    dosage: "3x daily for 5 days",
    doctor: "Dr. Johnson",
    scannedAt: "2025-01-15 13:15",
  },
  {
    id: "RX-2025-004",
    patientName: "Malika Abdullayeva",
    medication: "Levofloxacin 500mg",
    dosage: "1x daily for 10 days",
    doctor: "Dr. Smith",
    scannedAt: "2025-01-15 10:30",
  },
]

const dispensedPrescriptions = [
  {
    id: "RX-2025-001",
    patientName: "Alisher Karimov",
    medication: "Ciprofloxacin 500mg",
    dosage: "2x daily for 7 days",
    doctor: "Dr. Smith",
    scannedAt: "2025-01-15 14:30",
    dispensedAt: "2025-01-15 14:35",
  },
  {
    id: "RX-2025-003",
    patientName: "Bobur Tursunov",
    medication: "Ceftriaxone 1g",
    dosage: "1x daily for 5 days",
    doctor: "Dr. Smith",
    scannedAt: "2025-01-15 11:45",
    dispensedAt: "2025-01-15 11:50",
  },
]

export default function PrescriptionsPage() {
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <PharmacyLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Retseptlar</h1>
          <p className="text-muted-foreground">Barcha skanerlangan retseptlarni boshqarish</p>
        </div>

        {/* Search */}
        <Card>
          <CardContent className="pt-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Retsept ID yoki bemor ismi bo'yicha qidirish..."
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
            <TabsTrigger value="pending">Kutilmoqda ({pendingPrescriptions.length})</TabsTrigger>
            <TabsTrigger value="dispensed">Berilgan ({dispensedPrescriptions.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="pending" className="space-y-4">
            {pendingPrescriptions.map((prescription) => (
              <Card key={prescription.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg flex items-center justify-center">
                        <Clock className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{prescription.patientName}</CardTitle>
                        <CardDescription>Retsept ID: {prescription.id}</CardDescription>
                      </div>
                    </div>
                    <Badge variant="secondary">Kutilmoqda</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Dori</p>
                        <p className="font-medium">{prescription.medication}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Dozasi</p>
                        <p className="font-medium">{prescription.dosage}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Retsept yozgan</p>
                        <p className="font-medium">{prescription.doctor}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Link href={`/pharmacy/prescriptions/${prescription.id}`} className="flex-1">
                        <Button variant="outline" className="w-full bg-transparent">
                          Batafsil ko'rish
                        </Button>
                      </Link>
                      <Button className="flex-1">Berilgan deb belgilash</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="dispensed" className="space-y-4">
            {dispensedPrescriptions.map((prescription) => (
              <Card key={prescription.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                        <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{prescription.patientName}</CardTitle>
                        <CardDescription>Retsept ID: {prescription.id}</CardDescription>
                      </div>
                    </div>
                    <Badge>Berilgan</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Dori</p>
                        <p className="font-medium">{prescription.medication}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Dozasi</p>
                        <p className="font-medium">{prescription.dosage}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Berilgan vaqt</p>
                        <p className="font-medium">{prescription.dispensedAt}</p>
                      </div>
                    </div>
                    <Link href={`/pharmacy/prescriptions/${prescription.id}`}>
                      <Button variant="outline" className="w-full bg-transparent">
                        Batafsil ko'rish
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </PharmacyLayout>
  )
}
