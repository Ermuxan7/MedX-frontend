"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { PharmacyLayout } from "@/components/pharmacy/pharmacy-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { QrCode, Camera, Keyboard } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ScanPage() {
  const router = useRouter()
  const [manualCode, setManualCode] = useState("")
  const [scanning, setScanning] = useState(false)

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In production, this would verify the prescription code
    router.push(`/pharmacy/prescriptions/${manualCode}`)
  }

  const handleScan = () => {
    setScanning(true)
    // Simulate QR code scan
    setTimeout(() => {
      setScanning(false)
      // Mock prescription ID
      router.push("/pharmacy/prescriptions/RX-2025-001")
    }, 2000)
  }

  return (
    <PharmacyLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Retseptni skanerlash</h1>
          <p className="text-muted-foreground">QR kod yoki qo'lda kiritish orqali retseptni tekshirish</p>
        </div>

        <Tabs defaultValue="qr" className="space-y-4">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="qr">
              <QrCode className="h-4 w-4 mr-2" />
              QR Skaner
            </TabsTrigger>
            <TabsTrigger value="manual">
              <Keyboard className="h-4 w-4 mr-2" />
              Qo'lda kiritish
            </TabsTrigger>
          </TabsList>

          <TabsContent value="qr">
            <Card>
              <CardHeader>
                <CardTitle>QR Kod Skaner</CardTitle>
                <CardDescription>QR kodni skanerlash uchun ramka ichiga joylashtiring</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Scanner Area */}
                  <div className="relative aspect-square max-w-md mx-auto bg-muted rounded-lg flex items-center justify-center overflow-hidden">
                    {scanning ? (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-full h-1 bg-primary animate-pulse" />
                      </div>
                    ) : (
                      <div className="text-center space-y-4">
                        <Camera className="h-16 w-16 mx-auto text-muted-foreground" />
                        <p className="text-sm text-muted-foreground">
                          Skanerlashni boshlaganingizda kamera faollashadi
                        </p>
                      </div>
                    )}
                    {/* Scanner Frame */}
                    <div className="absolute inset-8 border-2 border-primary rounded-lg pointer-events-none">
                      <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-primary rounded-tl-lg" />
                      <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-primary rounded-tr-lg" />
                      <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-primary rounded-bl-lg" />
                      <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-primary rounded-br-lg" />
                    </div>
                  </div>

                  {/* Scan Button */}
                  <Button className="w-full max-w-md mx-auto block" onClick={handleScan} disabled={scanning}>
                    {scanning ? "Skanerlanyapti..." : "Skanerlashni boshlash"}
                  </Button>

                  {/* Instructions */}
                  <div className="max-w-md mx-auto p-4 bg-muted/50 rounded-lg">
                    <p className="text-sm font-medium mb-2">Ko'rsatmalar:</p>
                    <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                      <li>QR kodni ramka ichida barqaror ushlab turing</li>
                      <li>Eng yaxshi natija uchun yaxshi yoritilganlikni ta'minlang</li>
                      <li>Retsept avtomatik ravishda tekshiriladi</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="manual">
            <Card>
              <CardHeader>
                <CardTitle>Qo'lda kiritish</CardTitle>
                <CardDescription>Retsept kodini qo'lda kiriting</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleManualSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="code">Retsept kodi</Label>
                    <Input
                      id="code"
                      placeholder="masalan, RX-2025-001"
                      value={manualCode}
                      onChange={(e) => setManualCode(e.target.value)}
                      required
                    />
                    <p className="text-sm text-muted-foreground">
                      Retsept hujjatida ko'rsatilgan retsept ID ni kiriting
                    </p>
                  </div>

                  <Button type="submit" className="w-full">
                    Retseptni tekshirish
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </PharmacyLayout>
  )
}
