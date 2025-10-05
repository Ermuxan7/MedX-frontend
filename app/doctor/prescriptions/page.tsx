"use client"

import { DoctorLayout } from "@/components/doctor/doctor-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Calendar, User, Pill, FileText, Download } from "lucide-react"
import { useState } from "react"

// Mock data
const mockPrescriptions = [
  {
    id: "RX001",
    patientName: "Aliyev Sardor",
    patientId: 1,
    medication: "Ciprofloxacin",
    dosage: "500mg",
    frequency: "Kuniga 2 marta",
    duration: "7 kun",
    date: "2024-01-15",
    status: "active",
  },
  {
    id: "RX002",
    patientName: "Karimova Dilnoza",
    patientId: 2,
    medication: "Amoxicillin",
    dosage: "250mg",
    frequency: "Kuniga 3 marta",
    duration: "10 kun",
    date: "2024-01-14",
    status: "active",
  },
  {
    id: "RX003",
    patientName: "Rahimov Jasur",
    patientId: 3,
    medication: "Azithromycin",
    dosage: "500mg",
    frequency: "Kuniga 1 marta",
    duration: "5 kun",
    date: "2024-01-13",
    status: "completed",
  },
  {
    id: "RX004",
    patientName: "Toshmatova Nigora",
    patientId: 4,
    medication: "Levofloxacin",
    dosage: "750mg",
    frequency: "Kuniga 1 marta",
    duration: "7 kun",
    date: "2024-01-12",
    status: "active",
  },
  {
    id: "RX005",
    patientName: "Yusupov Otabek",
    patientId: 5,
    medication: "Doxycycline",
    dosage: "100mg",
    frequency: "Kuniga 2 marta",
    duration: "14 kun",
    date: "2024-01-10",
    status: "completed",
  },
]

export default function PrescriptionsPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredPrescriptions = mockPrescriptions.filter(
    (prescription) =>
      prescription.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prescription.medication.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prescription.id.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <DoctorLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold">Retseptlar</h1>
          <p className="text-muted-foreground">Barcha yozilgan retseptlarni ko'ring va boshqaring</p>
        </div>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Jami Retseptlar</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockPrescriptions.length}</div>
              <p className="text-xs text-muted-foreground">Barcha vaqt davomida</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Faol Retseptlar</CardTitle>
              <Pill className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockPrescriptions.filter((p) => p.status === "active").length}</div>
              <p className="text-xs text-muted-foreground">Hozirda davom etmoqda</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tugallangan</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {mockPrescriptions.filter((p) => p.status === "completed").length}
              </div>
              <p className="text-xs text-muted-foreground">Yakunlangan retseptlar</p>
            </CardContent>
          </Card>
        </div>

        {/* Search */}
        <div className="flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Bemor, dori yoki retsept ID bo'yicha qidiring..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Eksport
          </Button>
        </div>

        {/* Prescriptions List */}
        <div className="space-y-4">
          {filteredPrescriptions.map((prescription) => (
            <Card key={prescription.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <CardTitle className="text-lg">{prescription.medication}</CardTitle>
                      <Badge variant={prescription.status === "active" ? "default" : "secondary"}>
                        {prescription.status === "active" ? "Faol" : "Tugallangan"}
                      </Badge>
                    </div>
                    <CardDescription>Retsept ID: {prescription.id}</CardDescription>
                  </div>
                  <Button variant="outline" size="sm">
                    <FileText className="h-4 w-4 mr-2" />
                    Ko'rish
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">{prescription.patientName}</p>
                      <p className="text-xs text-muted-foreground">Bemor</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Pill className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">{prescription.dosage}</p>
                      <p className="text-xs text-muted-foreground">Dozasi</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">{prescription.frequency}</p>
                      <p className="text-xs text-muted-foreground">{prescription.duration}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">{prescription.date}</p>
                      <p className="text-xs text-muted-foreground">Yozilgan sana</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredPrescriptions.length === 0 && (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <FileText className="h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-lg font-medium mb-2">Retseptlar topilmadi</p>
              <p className="text-sm text-muted-foreground">Qidiruv so'rovingizga mos retseptlar yo'q</p>
            </CardContent>
          </Card>
        )}
      </div>
    </DoctorLayout>
  )
}
