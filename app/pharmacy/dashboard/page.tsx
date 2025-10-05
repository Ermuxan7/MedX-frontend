"use client"

import { PharmacyLayout } from "@/components/pharmacy/pharmacy-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { QrCode, Package, CheckCircle, Clock } from "lucide-react"
import Link from "next/link"

const stats = [
  { label: "Bugun skanerlandi", value: "24", icon: QrCode, trend: "Kechaga nisbatan +8" },
  { label: "Berildi", value: "22", icon: CheckCircle, trend: "91.7% bajarildi" },
  { label: "Kutilmoqda", value: "2", icon: Clock, trend: "Olib ketish kutilmoqda" },
  { label: "Bu oyda jami", value: "486", icon: Package, trend: "+15%" },
]

const recentPrescriptions = [
  {
    id: "RX-2025-001",
    patientName: "Alisher Karimov",
    medication: "Ciprofloxacin 500mg",
    dosage: "7 kun davomida kuniga 2 marta",
    doctor: "Dr. Smith",
    scannedAt: "2025-01-15 14:30",
    status: "dispensed",
  },
  {
    id: "RX-2025-002",
    patientName: "Dilnoza Rashidova",
    medication: "Amoxicillin 500mg",
    dosage: "5 kun davomida kuniga 3 marta",
    doctor: "Dr. Johnson",
    scannedAt: "2025-01-15 13:15",
    status: "pending",
  },
  {
    id: "RX-2025-003",
    patientName: "Bobur Tursunov",
    medication: "Ceftriaxone 1g",
    dosage: "5 kun davomida kuniga 1 marta",
    doctor: "Dr. Smith",
    scannedAt: "2025-01-15 11:45",
    status: "dispensed",
  },
]

export default function PharmacyDashboard() {
  return (
    <PharmacyLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Bosh sahifa</h1>
            <p className="text-muted-foreground">Xush kelibsiz, Shahar dorixonasi</p>
          </div>
          <Link href="/pharmacy/scan">
            <Button>
              <QrCode className="h-4 w-4 mr-2" />
              Retseptni skanerlash
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

        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 gap-4">
          <Link href="/pharmacy/scan">
            <Card className="hover:bg-muted/50 transition-colors cursor-pointer">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center space-y-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <QrCode className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold">QR kodni skanerlash</p>
                    <p className="text-sm text-muted-foreground">Retseptni tekshirish</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link href="/pharmacy/prescriptions">
            <Card className="hover:bg-muted/50 transition-colors cursor-pointer">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center space-y-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Package className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold">Retseptlarni ko'rish</p>
                    <p className="text-sm text-muted-foreground">Barcha retseptlar</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link href="/pharmacy/inventory">
            <Card className="hover:bg-muted/50 transition-colors cursor-pointer">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center space-y-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <CheckCircle className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold">Inventar</p>
                    <p className="text-sm text-muted-foreground">Zaxirani boshqarish</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>

        {/* Recent Prescriptions */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>So'nggi retseptlar</CardTitle>
                <CardDescription>Yaqinda skanerlangan retseptlar</CardDescription>
              </div>
              <Link href="/pharmacy/prescriptions">
                <Button variant="outline" size="sm">
                  Barchasini ko'rish
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentPrescriptions.map((prescription) => (
                <div key={prescription.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        prescription.status === "dispensed"
                          ? "bg-green-100 dark:bg-green-900/30"
                          : "bg-yellow-100 dark:bg-yellow-900/30"
                      }`}
                    >
                      {prescription.status === "dispensed" ? (
                        <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                      ) : (
                        <Clock className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium">{prescription.patientName}</p>
                      <p className="text-sm text-muted-foreground">{prescription.medication}</p>
                      <p className="text-xs text-muted-foreground">
                        {prescription.id} • {prescription.scannedAt}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <p className="text-sm font-medium capitalize">
                        {prescription.status === "dispensed" ? "Berildi" : "Kutilmoqda"}
                      </p>
                      <p className="text-xs text-muted-foreground">{prescription.doctor}</p>
                    </div>
                    {prescription.status === "pending" && <Button size="sm">Berilgan deb belgilash</Button>}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </PharmacyLayout>
  )
}
