"use client"

import { PatientLayout } from "@/components/patient/patient-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Bell, FileText, FlaskConical, Calendar, AlertCircle } from "lucide-react"

const upcomingReminders = [
  {
    id: 1,
    type: "medication",
    title: "Ciprofloxacin qabul qiling",
    time: "14:00",
    description: "500mg - kuniga 2 marta",
  },
  {
    id: 2,
    type: "appointment",
    title: "Keyingi ko'rik",
    time: "Ertaga, 10:00",
    description: "Dr. Smith - Umumiy ko'rik",
  },
]

const recentResults = [
  {
    id: 1,
    date: "2025-01-15",
    lab: "Markaziy tibbiy laboratoriya",
    type: "Antibiotiklarga sezgirlik testi",
    status: "completed",
  },
  {
    id: 2,
    date: "2025-01-10",
    lab: "Shahar diagnostika markazi",
    type: "Qon tahlili",
    status: "completed",
  },
]

const activePrescriptions = [
  {
    id: 1,
    medication: "Ciprofloxacin 500mg",
    doctor: "Dr. Smith",
    startDate: "2025-01-15",
    endDate: "2025-01-22",
    dosage: "Kuniga 2 marta",
  },
]

export default function PatientDashboard() {
  return (
    <PatientLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Bosh sahifa</h1>
          <p className="text-muted-foreground">Xush kelibsiz, Alisher</p>
        </div>

        {/* Alert Banner */}
        <Card className="border-yellow-200 bg-yellow-50 dark:border-yellow-900 dark:bg-yellow-900/20">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-yellow-600 dark:text-yellow-500 mt-0.5" />
              <div className="flex-1">
                <p className="font-medium text-yellow-900 dark:text-yellow-200">Yangi tahlil natijalari mavjud</p>
                <p className="text-sm text-yellow-800 dark:text-yellow-300 mt-1">
                  Markaziy tibbiy laboratoriyadan antibiotiklarga sezgirlik testi natijalari tayyor.
                </p>
                <Button size="sm" className="mt-3 bg-transparent" variant="outline">
                  Natijalarni ko'rish
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Faol retseptlar</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{activePrescriptions.length}</div>
              <p className="text-xs text-muted-foreground">Hozirda qabul qilayotgan dorilar</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tahlil natijalari</CardTitle>
              <FlaskConical className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{recentResults.length}</div>
              <p className="text-xs text-muted-foreground">Ko'rish uchun mavjud</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Yaqinlashayotgan eslatmalar</CardTitle>
              <Bell className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{upcomingReminders.length}</div>
              <p className="text-xs text-muted-foreground">Bugun va ertaga</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Reminders */}
          <Card>
            <CardHeader>
              <CardTitle>Bugungi eslatmalar</CardTitle>
              <CardDescription>Dori va uchrashuvlaringizni unutmang</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {upcomingReminders.map((reminder) => (
                  <div key={reminder.id} className="flex items-start gap-3 p-3 border rounded-lg">
                    <div
                      className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        reminder.type === "medication"
                          ? "bg-blue-100 dark:bg-blue-900/30"
                          : "bg-green-100 dark:bg-green-900/30"
                      }`}
                    >
                      {reminder.type === "medication" ? (
                        <FileText className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                      ) : (
                        <Calendar className="h-5 w-5 text-green-600 dark:text-green-400" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="font-medium">{reminder.title}</p>
                          <p className="text-sm text-muted-foreground">{reminder.description}</p>
                        </div>
                        <span className="text-sm font-medium">{reminder.time}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Active Prescriptions */}
          <Card>
            <CardHeader>
              <CardTitle>Faol retseptlar</CardTitle>
              <CardDescription>Hozirgi dorilaringiz</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {activePrescriptions.map((prescription) => (
                  <div key={prescription.id} className="p-4 border rounded-lg space-y-2">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-medium">{prescription.medication}</p>
                        <p className="text-sm text-muted-foreground">{prescription.doctor} tomonidan buyurilgan</p>
                      </div>
                      <Badge>Faol</Badge>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Dozasi: {prescription.dosage}</span>
                      <span className="text-muted-foreground">
                        {new Date(prescription.endDate).toLocaleDateString()} gacha
                      </span>
                    </div>
                    <Button variant="outline" size="sm" className="w-full bg-transparent">
                      Batafsil
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Lab Results */}
        <Card>
          <CardHeader>
            <CardTitle>So'nggi tahlil natijalari</CardTitle>
            <CardDescription>Eng oxirgi test natijalaringiz</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentResults.map((result) => (
                <div key={result.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <FlaskConical className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">{result.type}</p>
                      <p className="text-sm text-muted-foreground">
                        {result.lab} • {result.date}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant="secondary">Bajarildi</Badge>
                    <Button variant="outline" size="sm">
                      Natijalarni ko'rish
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </PatientLayout>
  )
}
