"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { PharmacyLayout } from "@/components/pharmacy/pharmacy-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, CheckCircle, AlertTriangle } from "lucide-react"
import QRCode from "react-qr-code"

// Mock prescription data
const prescriptionData = {
  id: "RX-2025-001",
  patientId: 1,
  patientName: "Alisher Karimov",
  patientPhone: "+998 90 123 4567",
  medication: "Ciprofloxacin 500mg",
  dosage: "2x daily",
  duration: "7 days",
  instructions: "Take with food. Avoid dairy products within 2 hours of taking this medication.",
  doctor: "Dr. Smith",
  doctorLicense: "MD-12345",
  prescribedDate: "2025-01-15",
  scannedAt: "2025-01-15 14:30",
  status: "pending",
  allergies: ["Penicillin"],
}

export default function PrescriptionDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [status, setStatus] = useState(prescriptionData.status)

  const handleDispense = () => {
    setStatus("dispensed")
    alert("Retsept berilgan deb belgilandi")
  }

  return (
    <PharmacyLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex-1">
            <h1 className="text-3xl font-bold tracking-tight">Retsept tafsilotlari</h1>
            <p className="text-muted-foreground">ID: {params.id}</p>
          </div>
          <Badge variant={status === "dispensed" ? "default" : "secondary"} className="capitalize">
            {status === "dispensed" ? "Berilgan" : "Kutilmoqda"}
          </Badge>
        </div>

        {/* Verification Status */}
        <Card className="border-green-200 bg-green-50 dark:border-green-900 dark:bg-green-900/20">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-500 mt-0.5" />
              <div>
                <p className="font-medium text-green-900 dark:text-green-200">Retsept tasdiqlangan</p>
                <p className="text-sm text-green-800 dark:text-green-300 mt-1">
                  Ushbu retsept tekshirilgan va berish uchun yaroqli.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Patient Allergies Warning */}
        {prescriptionData.allergies.length > 0 && (
          <Card className="border-yellow-200 bg-yellow-50 dark:border-yellow-900 dark:bg-yellow-900/20">
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-yellow-600 dark:text-yellow-500 mt-0.5" />
                <div>
                  <p className="font-medium text-yellow-900 dark:text-yellow-200">Bemor allergiyalari</p>
                  <p className="text-sm text-yellow-800 dark:text-yellow-300 mt-1">
                    Bemorning allergiyasi: {prescriptionData.allergies.join(", ")}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Patient Information */}
          <Card>
            <CardHeader>
              <CardTitle>Bemor ma'lumotlari</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="text-sm text-muted-foreground">Ism</p>
                <p className="font-medium">{prescriptionData.patientName}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Bemor ID</p>
                <p className="font-medium">P-{prescriptionData.patientId.toString().padStart(6, "0")}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Telefon</p>
                <p className="font-medium">{prescriptionData.patientPhone}</p>
              </div>
            </CardContent>
          </Card>

          {/* Doctor Information */}
          <Card>
            <CardHeader>
              <CardTitle>Retsept yozgan shifokor</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="text-sm text-muted-foreground">Shifokor ismi</p>
                <p className="font-medium">{prescriptionData.doctor}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Litsenziya raqami</p>
                <p className="font-medium">{prescriptionData.doctorLicense}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Retsept yozilgan sana</p>
                <p className="font-medium">{prescriptionData.prescribedDate}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Prescription Details */}
        <Card>
          <CardHeader>
            <CardTitle>Retsept tafsilotlari</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Dori</p>
                <p className="font-medium text-lg">{prescriptionData.medication}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Dozasi</p>
                <p className="font-medium text-lg">{prescriptionData.dosage}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Davomiyligi</p>
                <p className="font-medium text-lg">{prescriptionData.duration}</p>
              </div>
            </div>

            <div className="p-4 bg-muted rounded-lg">
              <p className="text-sm font-medium mb-2">Ko'rsatmalar:</p>
              <p className="text-sm text-muted-foreground">{prescriptionData.instructions}</p>
            </div>
          </CardContent>
        </Card>

        {/* QR Code */}
        <Card>
          <CardHeader>
            <CardTitle>Retsept QR kodi</CardTitle>
            <CardDescription>Tekshirish uchun asl retsept QR kodi</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-center p-6 bg-white rounded-lg">
              <QRCode value={JSON.stringify(prescriptionData)} size={200} />
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        {status === "pending" && (
          <div className="flex gap-2">
            <Button variant="outline" className="flex-1 bg-transparent" onClick={() => router.back()}>
              Bekor qilish
            </Button>
            <Button className="flex-1" onClick={handleDispense}>
              <CheckCircle className="h-4 w-4 mr-2" />
              Berilgan deb belgilash
            </Button>
          </div>
        )}
      </div>
    </PharmacyLayout>
  )
}
