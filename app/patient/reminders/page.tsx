"use client"

import { PatientLayout } from "@/components/patient/patient-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Bell, Clock, Pill, Check, X } from "lucide-react"

const reminders = [
  {
    id: 1,
    medication: "Amoxicillin 500mg",
    time: "08:00",
    status: "pending",
    frequency: "Kuniga 3 marta",
    nextDose: "2 soatdan keyin",
  },
  {
    id: 2,
    medication: "Ciprofloxacin 250mg",
    time: "14:00",
    status: "completed",
    frequency: "Kuniga 2 marta",
    nextDose: "Qabul qilindi",
  },
  {
    id: 3,
    medication: "Azithromycin 500mg",
    time: "20:00",
    status: "pending",
    frequency: "Kuniga 1 marta",
    nextDose: "6 soatdan keyin",
  },
  {
    id: 4,
    medication: "Doxycycline 100mg",
    time: "09:00",
    status: "missed",
    frequency: "Kuniga 2 marta",
    nextDose: "O'tkazib yuborildi",
  },
]

export default function RemindersPage() {
  return (
    <PatientLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Dori eslatmalari</h1>
          <p className="text-muted-foreground mt-2">Dori qabul qilish jadvalingizni kuzatib boring</p>
        </div>

        {/* Summary Cards */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Bugungi eslatmalar</CardTitle>
              <Bell className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8</div>
              <p className="text-xs text-muted-foreground">Jami eslatmalar soni</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Qabul qilindi</CardTitle>
              <Check className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">3</div>
              <p className="text-xs text-muted-foreground">Bugun qabul qilindi</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Kutilmoqda</CardTitle>
              <Clock className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">4</div>
              <p className="text-xs text-muted-foreground">Qabul qilish kerak</p>
            </CardContent>
          </Card>
        </div>

        {/* Reminders List */}
        <Card>
          <CardHeader>
            <CardTitle>Bugungi jadval</CardTitle>
            <CardDescription>Dori qabul qilish vaqtlari va holati</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {reminders.map((reminder) => (
                <div
                  key={reminder.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center ${
                        reminder.status === "completed"
                          ? "bg-green-100 text-green-600"
                          : reminder.status === "missed"
                            ? "bg-red-100 text-red-600"
                            : "bg-blue-100 text-blue-600"
                      }`}
                    >
                      <Pill className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="font-medium">{reminder.medication}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Clock className="h-3 w-3 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">{reminder.time}</span>
                        <span className="text-sm text-muted-foreground">•</span>
                        <span className="text-sm text-muted-foreground">{reminder.frequency}</span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{reminder.nextDose}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {reminder.status === "pending" && (
                      <>
                        <Button size="sm" variant="outline">
                          <X className="h-4 w-4 mr-1" />
                          O'tkazib yuborish
                        </Button>
                        <Button size="sm">
                          <Check className="h-4 w-4 mr-1" />
                          Qabul qildim
                        </Button>
                      </>
                    )}
                    {reminder.status === "completed" && (
                      <Badge variant="secondary" className="bg-green-100 text-green-700">
                        <Check className="h-3 w-3 mr-1" />
                        Qabul qilindi
                      </Badge>
                    )}
                    {reminder.status === "missed" && (
                      <Badge variant="secondary" className="bg-red-100 text-red-700">
                        <X className="h-3 w-3 mr-1" />
                        O'tkazib yuborildi
                      </Badge>
                    )}
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
