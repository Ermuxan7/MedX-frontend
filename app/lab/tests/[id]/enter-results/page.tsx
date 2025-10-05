"use client"

import type React from "react"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { LabLayout } from "@/components/lab/lab-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Plus, Trash2 } from "lucide-react"

// Mock test data
const testData = {
  id: 1,
  patientName: "Alisher Karimov",
  patientId: "P-2025-001",
  testType: "Antibiotic Sensitivity Test",
  sampleType: "Blood Culture",
  receivedDate: "2025-01-15",
}

// Common antibiotics list
const commonAntibiotics = [
  "Amoxicillin",
  "Ampicillin",
  "Ceftriaxone",
  "Ciprofloxacin",
  "Clindamycin",
  "Erythromycin",
  "Gentamicin",
  "Levofloxacin",
  "Vancomycin",
  "Trimethoprim",
]

interface AntibioticResult {
  id: string
  name: string
  status: string
  mic: string
}

export default function EnterResultsPage() {
  const params = useParams()
  const router = useRouter()
  const [bacteria, setBacteria] = useState("")
  const [antibiotics, setAntibiotics] = useState<AntibioticResult[]>([{ id: "1", name: "", status: "", mic: "" }])
  const [notes, setNotes] = useState("")

  const addAntibiotic = () => {
    setAntibiotics([...antibiotics, { id: Date.now().toString(), name: "", status: "", mic: "" }])
  }

  const removeAntibiotic = (id: string) => {
    setAntibiotics(antibiotics.filter((a) => a.id !== id))
  }

  const updateAntibiotic = (id: string, field: keyof AntibioticResult, value: string) => {
    setAntibiotics(antibiotics.map((a) => (a.id === id ? { ...a, [field]: value } : a)))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In production, this would save to database
    alert("Natijalar muvaffaqiyatli saqlandi!")
    router.push("/lab/tests")
  }

  return (
    <LabLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Test natijalarini kiritish</h1>
            <p className="text-muted-foreground">Test ID: {params.id}</p>
          </div>
        </div>

        {/* Patient Info */}
        <Card>
          <CardHeader>
            <CardTitle>Bemor ma'lumotlari</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Bemor ismi</p>
                <p className="font-medium">{testData.patientName}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Bemor ID</p>
                <p className="font-medium">{testData.patientId}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Namuna turi</p>
                <p className="font-medium">{testData.sampleType}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Qabul qilingan sana</p>
                <p className="font-medium">{testData.receivedDate}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Bacteria Detected */}
          <Card>
            <CardHeader>
              <CardTitle>Aniqlangan organizm</CardTitle>
              <CardDescription>Namunada aniqlangan bakteriya yoki organizmni kiriting</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Label htmlFor="bacteria">Bakteriya/Organizm nomi</Label>
                <Input
                  id="bacteria"
                  placeholder="masalan, Staphylococcus aureus"
                  value={bacteria}
                  onChange={(e) => setBacteria(e.target.value)}
                  required
                />
              </div>
            </CardContent>
          </Card>

          {/* Antibiotic Sensitivity */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Antibiotiklarga sezgirlik natijalari</CardTitle>
                  <CardDescription>
                    Har bir sinovdan o'tgan antibiotik uchun sezgirlik natijalarini kiriting
                  </CardDescription>
                </div>
                <Button type="button" variant="outline" size="sm" onClick={addAntibiotic}>
                  <Plus className="h-4 w-4 mr-2" />
                  Antibiotik qo'shish
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {antibiotics.map((antibiotic, index) => (
                  <div key={antibiotic.id} className="p-4 border rounded-lg space-y-4">
                    <div className="flex items-center justify-between">
                      <p className="font-medium">Antibiotik {index + 1}</p>
                      {antibiotics.length > 1 && (
                        <Button type="button" variant="ghost" size="sm" onClick={() => removeAntibiotic(antibiotic.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>

                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label>Antibiotik nomi</Label>
                        <Select
                          value={antibiotic.name}
                          onValueChange={(value) => updateAntibiotic(antibiotic.id, "name", value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Antibiotikni tanlang" />
                          </SelectTrigger>
                          <SelectContent>
                            {commonAntibiotics.map((name) => (
                              <SelectItem key={name} value={name}>
                                {name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label>Sezgirlik holati</Label>
                        <Select
                          value={antibiotic.status}
                          onValueChange={(value) => updateAntibiotic(antibiotic.id, "status", value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Holatni tanlang" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="sensitive">Sezgir</SelectItem>
                            <SelectItem value="intermediate">O'rtacha</SelectItem>
                            <SelectItem value="resistant">Rezistent</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label>MIC (μg/mL)</Label>
                        <Input
                          placeholder="masalan, 0.5"
                          value={antibiotic.mic}
                          onChange={(e) => updateAntibiotic(antibiotic.id, "mic", e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Laboratory Notes */}
          <Card>
            <CardHeader>
              <CardTitle>Laboratoriya eslatmalari</CardTitle>
              <CardDescription>Qo'shimcha kuzatishlar yoki tavsiyalar</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Label htmlFor="notes">Eslatmalar</Label>
                <Textarea
                  id="notes"
                  placeholder="Qo'shimcha eslatmalar, kuzatishlar yoki tavsiyalarni kiriting..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={4}
                />
              </div>
            </CardContent>
          </Card>

          {/* Submit Buttons */}
          <div className="flex gap-2">
            <Button type="button" variant="outline" className="flex-1 bg-transparent" onClick={() => router.back()}>
              Bekor qilish
            </Button>
            <Button type="submit" className="flex-1">
              Saqlash va natijalarni yuborish
            </Button>
          </div>
        </form>
      </div>
    </LabLayout>
  )
}
