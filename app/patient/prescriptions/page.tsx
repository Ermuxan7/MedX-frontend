"use client"
import { PatientLayout } from "@/components/patient/patient-layout"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileText, MoreVertical, Eye, QrCode, Bell } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const activePrescriptions = [
  {
    id: 1,
    medication: "Siprofloksatsin 500mg",
    doctor: "Dr. Aliyev",
    startDate: "2025-01-15",
    endDate: "2025-01-22",
    dosage: "Kuniga 2 marta",
    instructions:
      "Ovqat bilan qabul qiling. Ushbu dorini qabul qilishdan 2 soat oldin va keyin sut mahsulotlarini iste'mol qilmang.",
    qrCode: "RX-2025-001",
  },
]

const completedPrescriptions = [
  {
    id: 2,
    medication: "Seftriakson 1g",
    doctor: "Dr. Aliyev",
    startDate: "2024-12-20",
    endDate: "2024-12-25",
    dosage: "Kuniga 1 marta",
    instructions: "Klinikada in'ektsiya orqali yuborildi.",
  },
  {
    id: 3,
    medication: "Amoksitsillin 500mg",
    doctor: "Dr. Karimov",
    startDate: "2024-11-10",
    endDate: "2024-11-17",
    dosage: "Kuniga 3 marta",
    instructions: "Alomatlar yaxshilansa ham, to'liq kursni yakunlang.",
  },
]

export default function PrescriptionsPage() {
  return (
    <PatientLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Retseptlar</h1>
          <p className="text-muted-foreground">Joriy va o'tgan retseptlaringizni ko'ring</p>
        </div>

        <Tabs defaultValue="active" className="space-y-4">
          <TabsList>
            <TabsTrigger value="active">Faol ({activePrescriptions.length})</TabsTrigger>
            <TabsTrigger value="completed">Yakunlangan ({completedPrescriptions.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="active" className="space-y-3">
            {activePrescriptions.map((prescription) => (
              <Card key={prescription.id}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4 flex-1 min-w-0">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <FileText className="h-6 w-6 text-primary" />
                      </div>
                      <div className="flex items-center gap-2 text-sm flex-1 min-w-0">
                        <span className="font-medium truncate">{prescription.medication}</span>
                        <span className="text-muted-foreground flex-shrink-0">•</span>
                        <span className="text-muted-foreground">{prescription.dosage}</span>
                        <span className="text-muted-foreground flex-shrink-0">•</span>
                        <span className="text-muted-foreground truncate">{prescription.doctor}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 flex-shrink-0">
                      <div className="flex items-center gap-2 text-sm">
                        <span className="text-muted-foreground">Tugash:</span>
                        <span className="font-medium">{prescription.endDate}</span>
                      </div>
                      <Badge>Faol</Badge>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Eye className="h-4 w-4 mr-2" />
                            Batafsil ko'rish
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <QrCode className="h-4 w-4 mr-2" />
                            QR kodni ko'rsatish
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Bell className="h-4 w-4 mr-2" />
                            Eslatma qo'shish
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="completed" className="space-y-3">
            {completedPrescriptions.map((prescription) => (
              <Card key={prescription.id}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4 flex-1 min-w-0">
                      <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center flex-shrink-0">
                        <FileText className="h-6 w-6 text-muted-foreground" />
                      </div>
                      <div className="flex items-center gap-2 text-sm flex-1 min-w-0">
                        <span className="font-medium truncate">{prescription.medication}</span>
                        <span className="text-muted-foreground flex-shrink-0">•</span>
                        <span className="text-muted-foreground">{prescription.dosage}</span>
                        <span className="text-muted-foreground flex-shrink-0">•</span>
                        <span className="text-muted-foreground truncate">{prescription.doctor}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 flex-shrink-0">
                      <div className="flex items-center gap-2 text-sm">
                        <span className="text-muted-foreground">Tugagan:</span>
                        <span className="font-medium">{prescription.endDate}</span>
                      </div>
                      <Badge>Tugagan</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </PatientLayout>
  )
}
