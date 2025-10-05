"use client"

import { useParams, useRouter } from "next/navigation"
import { PatientLayout } from "@/components/patient/patient-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Download, Share2 } from "lucide-react"

const resultData = {
  id: 1,
  date: "2025-01-15",
  lab: "Markaziy tibbiy laboratoriya",
  type: "Antibiotiklarga sezgirlik testi",
  bacteria: "Staphylococcus aureus",
  sampleType: "Qon ekini",
  collectionDate: "2025-01-14",
  antibiotics: [
    { name: "Amoksitsillin", status: "resistant", mic: ">256" },
    { name: "Siprofloksatsin", status: "sensitive", mic: "0.5" },
    { name: "Gentamitsin", status: "sensitive", mic: "1" },
    { name: "Eritromitsin", status: "intermediate", mic: "4" },
    { name: "Vankomitsin", status: "sensitive", mic: "0.5" },
    { name: "Klindamitsin", status: "resistant", mic: "8" },
  ],
  notes:
    "Ajratilgan mikroorganizm beta-laktam antibiotiklariga qarshilik ko'rsatadi. Davolash uchun ftorxinolonlar yoki aminoglikozidlardan foydalanish tavsiya etiladi.",
}

export default function ResultDetailPage() {
  const params = useParams()
  const router = useRouter()

  return (
    <PatientLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex-1">
            <h1 className="text-3xl font-bold tracking-tight">{resultData.type}</h1>
            <p className="text-muted-foreground">Natija ID: {params.id}</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Yuklab olish
            </Button>
            <Button variant="outline">
              <Share2 className="h-4 w-4 mr-2" />
              Ulashish
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Test ma'lumotlari</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Laboratoriya</p>
                <p className="font-medium">{resultData.lab}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Test sanasi</p>
                <p className="font-medium">{resultData.date}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Namuna turi</p>
                <p className="font-medium">{resultData.sampleType}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Olingan sana</p>
                <p className="font-medium">{resultData.collectionDate}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Aniqlangan mikroorganizm</CardTitle>
            <CardDescription>Namunangizda topilgan bakteriya</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="p-4 bg-muted rounded-lg">
              <p className="text-lg font-semibold">{resultData.bacteria}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Antibiotiklarga sezgirlik natijalari</CardTitle>
            <CardDescription>Bakteriyaning turli antibiotiklarга javob berishi</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {resultData.antibiotics.map((antibiotic) => (
                <div key={antibiotic.name} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <p className="font-medium">{antibiotic.name}</p>
                    <p className="text-sm text-muted-foreground">MIK: {antibiotic.mic} μg/mL</p>
                  </div>
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

            <div className="mt-6 p-4 bg-muted/50 rounded-lg space-y-2">
              <p className="text-sm font-medium">Natijalarni tushunish:</p>
              <div className="grid md:grid-cols-3 gap-3 text-sm">
                <div className="flex items-center gap-2">
                  <Badge>Sezgir</Badge>
                  <span className="text-muted-foreground">Antibiotik samarali ishlaydi</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">O'rtacha</Badge>
                  <span className="text-muted-foreground">Yuqori dozada ishlashi mumkin</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="destructive">Rezistent</Badge>
                  <span className="text-muted-foreground">Antibiotik ishlamaydi</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Laboratoriya izohlari</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm leading-relaxed">{resultData.notes}</p>
          </CardContent>
        </Card>

        <Card className="border-blue-200 bg-blue-50 dark:border-blue-900 dark:bg-blue-900/20">
          <CardContent className="pt-6">
            <p className="text-sm text-blue-900 dark:text-blue-200">
              <strong>Muhim:</strong> Bu natijalar shifokoringiz tomonidan talqin qilinishi kerak. Bu natijalarga
              asoslanib o'z-o'zini davolamang. Har qanday dori vositasini boshlashdan yoki o'zgartirishdan oldin doim
              shifokoringiz bilan maslahatlashing.
            </p>
          </CardContent>
        </Card>
      </div>
    </PatientLayout>
  )
}
