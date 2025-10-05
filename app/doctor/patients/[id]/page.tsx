"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { DoctorLayout } from "@/components/doctor/doctor-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, FileText, QrCode } from "lucide-react"
import { PrescriptionDialog } from "@/components/doctor/prescription-dialog"

// Mock patient data
const patientData = {
  id: 1,
  name: "Alisher Karimov",
  age: 45,
  phone: "+998 90 123 4567",
  email: "alisher.k@example.com",
  address: "Tashkent, Yunusabad district",
  bloodType: "A+",
  allergies: ["Penicillin"],
}

// Mock sensitivity results
const sensitivityResults = [
  {
    id: 1,
    date: "2025-01-15",
    lab: "Central Medical Lab",
    bacteria: "Staphylococcus aureus",
    antibiotics: [
      { name: "Amoxicillin", status: "resistant" },
      { name: "Ciprofloxacin", status: "sensitive" },
      { name: "Gentamicin", status: "sensitive" },
      { name: "Erythromycin", status: "intermediate" },
      { name: "Vancomycin", status: "sensitive" },
    ],
  },
  {
    id: 2,
    date: "2024-12-20",
    lab: "City Diagnostic Center",
    bacteria: "Escherichia coli",
    antibiotics: [
      { name: "Ampicillin", status: "resistant" },
      { name: "Ceftriaxone", status: "sensitive" },
      { name: "Levofloxacin", status: "sensitive" },
      { name: "Trimethoprim", status: "intermediate" },
    ],
  },
]

const prescriptionHistory = [
  {
    id: 1,
    date: "2025-01-15",
    medication: "Ciprofloxacin 500mg",
    dosage: "2x daily for 7 days",
    status: "Active",
  },
  {
    id: 2,
    date: "2024-12-20",
    medication: "Ceftriaxone 1g",
    dosage: "1x daily for 5 days",
    status: "Completed",
  },
]

export default function PatientDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [showPrescriptionDialog, setShowPrescriptionDialog] = useState(false)

  return (
    <DoctorLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex-1">
            <h1 className="text-3xl font-bold tracking-tight">{patientData.name}</h1>
            <p className="text-muted-foreground">Bemor ID: {params.id}</p>
          </div>
          <Button onClick={() => setShowPrescriptionDialog(true)}>
            <FileText className="h-4 w-4 mr-2" />
            Yangi retsept
          </Button>
        </div>

        {/* Patient Info Card */}
        <Card>
          <CardHeader>
            <CardTitle>Bemor ma'lumotlari</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Yosh</p>
                <p className="font-medium">{patientData.age} yosh</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Qon guruhi</p>
                <p className="font-medium">{patientData.bloodType}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Telefon</p>
                <p className="font-medium">{patientData.phone}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="font-medium">{patientData.email}</p>
              </div>
              <div className="md:col-span-2">
                <p className="text-sm text-muted-foreground">Manzil</p>
                <p className="font-medium">{patientData.address}</p>
              </div>
              <div className="md:col-span-2">
                <p className="text-sm text-muted-foreground">Allergiyalar</p>
                <div className="flex gap-2 mt-1">
                  {patientData.allergies.map((allergy) => (
                    <Badge key={allergy} variant="destructive">
                      {allergy}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs defaultValue="sensitivity" className="space-y-4">
          <TabsList>
            <TabsTrigger value="sensitivity">Sezgirlik natijalari</TabsTrigger>
            <TabsTrigger value="prescriptions">Retseptlar tarixi</TabsTrigger>
          </TabsList>

          <TabsContent value="sensitivity" className="space-y-4">
            {sensitivityResults.map((result) => (
              <Card key={result.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle>{result.bacteria}</CardTitle>
                      <CardDescription>
                        {result.lab} • {result.date}
                      </CardDescription>
                    </div>
                    <Badge>Eng so'nggi</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <p className="text-sm font-medium">Antibiotiklarga sezgirlik:</p>
                    <div className="grid md:grid-cols-2 gap-3">
                      {result.antibiotics.map((antibiotic) => (
                        <div key={antibiotic.name} className="flex items-center justify-between p-3 border rounded-lg">
                          <span className="font-medium">{antibiotic.name}</span>
                          <Badge
                            variant={
                              antibiotic.status === "sensitive"
                                ? "default"
                                : antibiotic.status === "resistant"
                                  ? "destructive"
                                  : "secondary"
                            }
                          >
                            {antibiotic.status === "sensitive"
                              ? "Sezgir"
                              : antibiotic.status === "resistant"
                                ? "Rezistent"
                                : "O'rtacha"}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="prescriptions" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Retseptlar tarixi</CardTitle>
                <CardDescription>Ushbu bemor uchun barcha retseptlar</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {prescriptionHistory.map((prescription) => (
                    <div key={prescription.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="space-y-1">
                        <p className="font-medium">{prescription.medication}</p>
                        <p className="text-sm text-muted-foreground">{prescription.dosage}</p>
                        <p className="text-xs text-muted-foreground">{prescription.date}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge variant={prescription.status === "Active" ? "default" : "secondary"}>
                          {prescription.status === "Active" ? "Faol" : "Tugallangan"}
                        </Badge>
                        <Button variant="outline" size="sm">
                          <QrCode className="h-4 w-4 mr-2" />
                          QR ko'rish
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <PrescriptionDialog
        open={showPrescriptionDialog}
        onOpenChange={setShowPrescriptionDialog}
        patientName={patientData.name}
        patientId={patientData.id}
      />
    </DoctorLayout>
  )
}
