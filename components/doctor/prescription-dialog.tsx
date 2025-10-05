"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { QrCode } from "lucide-react"
import QRCode from "react-qr-code"

interface PrescriptionDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  patientName: string
  patientId: number
}

export function PrescriptionDialog({ open, onOpenChange, patientName, patientId }: PrescriptionDialogProps) {
  const [step, setStep] = useState<"form" | "qr">("form")
  const [formData, setFormData] = useState({
    medication: "",
    dosage: "",
    frequency: "",
    duration: "",
    instructions: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setStep("qr")
  }

  const prescriptionData = {
    id: Math.random().toString(36).substring(7).toUpperCase(),
    patientId,
    patientName,
    ...formData,
    date: new Date().toISOString(),
    doctor: "Dr. Smith",
  }

  const qrValue = JSON.stringify(prescriptionData)

  const handleClose = () => {
    setStep("form")
    setFormData({
      medication: "",
      dosage: "",
      frequency: "",
      duration: "",
      instructions: "",
    })
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl">
        {step === "form" ? (
          <>
            <DialogHeader>
              <DialogTitle>Yangi Retsept</DialogTitle>
              <DialogDescription>{patientName} uchun yangi retsept yozing</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="medication">Dori nomi</Label>
                  <Input
                    id="medication"
                    placeholder="masalan, Ciprofloxacin"
                    value={formData.medication}
                    onChange={(e) => setFormData({ ...formData, medication: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dosage">Dozasi</Label>
                  <Input
                    id="dosage"
                    placeholder="masalan, 500mg"
                    value={formData.dosage}
                    onChange={(e) => setFormData({ ...formData, dosage: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="frequency">Qabul qilish chastotasi</Label>
                  <Select
                    value={formData.frequency}
                    onValueChange={(value) => setFormData({ ...formData, frequency: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Chastotani tanlang" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1x">Kuniga 1 marta</SelectItem>
                      <SelectItem value="2x">Kuniga 2 marta</SelectItem>
                      <SelectItem value="3x">Kuniga 3 marta</SelectItem>
                      <SelectItem value="4x">Kuniga 4 marta</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="duration">Davomiyligi</Label>
                  <Select
                    value={formData.duration}
                    onValueChange={(value) => setFormData({ ...formData, duration: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Davomiylikni tanlang" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="3">3 kun</SelectItem>
                      <SelectItem value="5">5 kun</SelectItem>
                      <SelectItem value="7">7 kun</SelectItem>
                      <SelectItem value="10">10 kun</SelectItem>
                      <SelectItem value="14">14 kun</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="instructions">Qo'shimcha ko'rsatmalar</Label>
                <Textarea
                  id="instructions"
                  placeholder="masalan, Ovqat bilan qabul qiling, spirtli ichimlikdan saqlaning..."
                  value={formData.instructions}
                  onChange={(e) => setFormData({ ...formData, instructions: e.target.value })}
                  rows={3}
                />
              </div>

              <div className="flex gap-2 justify-end">
                <Button type="button" variant="outline" onClick={handleClose}>
                  Bekor qilish
                </Button>
                <Button type="submit">
                  <QrCode className="h-4 w-4 mr-2" />
                  Retsept yaratish
                </Button>
              </div>
            </form>
          </>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>Retsept QR Kodi</DialogTitle>
              <DialogDescription>Bu QR kodni bemor va dorixona bilan bo'lishing</DialogDescription>
            </DialogHeader>
            <div className="space-y-6">
              <div className="flex justify-center p-6 bg-white rounded-lg">
                <QRCode value={qrValue} size={256} />
              </div>

              <div className="space-y-3 p-4 bg-muted rounded-lg">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Retsept ID:</span>
                  <span className="text-sm font-medium">{prescriptionData.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Bemor:</span>
                  <span className="text-sm font-medium">{patientName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Dori:</span>
                  <span className="text-sm font-medium">
                    {formData.medication} {formData.dosage}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Dozasi:</span>
                  <span className="text-sm font-medium">
                    {formData.frequency} {formData.duration} kun davomida
                  </span>
                </div>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" className="flex-1 bg-transparent" onClick={handleClose}>
                  Yopish
                </Button>
                <Button className="flex-1" onClick={() => window.print()}>
                  Retseptni chop etish
                </Button>
              </div>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
