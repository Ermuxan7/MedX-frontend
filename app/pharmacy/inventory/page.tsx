"use client"

import { useState } from "react"
import { PharmacyLayout } from "@/components/pharmacy/pharmacy-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Search, Plus, Package, AlertTriangle, Calendar, Edit, Trash2 } from "lucide-react"

// Mock data
const mockInventory = [
  {
    id: 1,
    name: "Amoksitsillin 500mg",
    category: "Antibiotik",
    quantity: 150,
    minQuantity: 50,
    price: 25000,
    expiryDate: "2025-12-31",
    supplier: "PharmaCorp",
  },
  {
    id: 2,
    name: "Tsiprofloksatsin 250mg",
    category: "Antibiotik",
    quantity: 30,
    minQuantity: 40,
    price: 35000,
    expiryDate: "2025-06-15",
    supplier: "MedSupply",
  },
  {
    id: 3,
    name: "Azitromitsin 500mg",
    category: "Antibiotik",
    quantity: 200,
    minQuantity: 60,
    price: 45000,
    expiryDate: "2026-03-20",
    supplier: "PharmaCorp",
  },
  {
    id: 4,
    name: "Doksitsiklin 100mg",
    category: "Antibiotik",
    quantity: 25,
    minQuantity: 30,
    price: 28000,
    expiryDate: "2025-04-10",
    supplier: "HealthMeds",
  },
  {
    id: 5,
    name: "Levofloksatsin 500mg",
    category: "Antibiotik",
    quantity: 80,
    minQuantity: 40,
    price: 52000,
    expiryDate: "2025-11-25",
    supplier: "MedSupply",
  },
]

export default function PharmacyInventoryPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [inventory] = useState(mockInventory)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)

  const filteredInventory = inventory.filter(
    (item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const lowStockItems = inventory.filter((item) => item.quantity <= item.minQuantity)
  const expiringItems = inventory.filter((item) => {
    const daysUntilExpiry = Math.floor(
      (new Date(item.expiryDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24),
    )
    return daysUntilExpiry <= 90 && daysUntilExpiry > 0
  })

  const totalValue = inventory.reduce((sum, item) => sum + item.quantity * item.price, 0)

  const getStockStatus = (item: (typeof inventory)[0]) => {
    if (item.quantity <= item.minQuantity) {
      return { label: "Kam", variant: "destructive" as const }
    }
    if (item.quantity <= item.minQuantity * 1.5) {
      return { label: "O'rtacha", variant: "secondary" as const }
    }
    return { label: "Yetarli", variant: "default" as const }
  }

  const getDaysUntilExpiry = (expiryDate: string) => {
    return Math.floor((new Date(expiryDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
  }

  return (
    <PharmacyLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold">Inventar boshqaruvi</h1>
            <p className="text-muted-foreground">Dori-darmonlar zaxirasini boshqaring</p>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Dori qo'shish
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Yangi dori qo'shish</DialogTitle>
                <DialogDescription>Inventarga yangi dori-darmoni qo'shing</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Dori nomi</Label>
                    <Input id="name" placeholder="Masalan: Amoksitsillin 500mg" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category">Kategoriya</Label>
                    <Input id="category" placeholder="Masalan: Antibiotik" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="quantity">Miqdori</Label>
                    <Input id="quantity" type="number" placeholder="0" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="minQuantity">Minimal miqdor</Label>
                    <Input id="minQuantity" type="number" placeholder="0" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="price">Narxi (so'm)</Label>
                    <Input id="price" type="number" placeholder="0" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="expiryDate">Amal qilish muddati</Label>
                    <Input id="expiryDate" type="date" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="supplier">Yetkazib beruvchi</Label>
                  <Input id="supplier" placeholder="Masalan: PharmaCorp" />
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Bekor qilish
                </Button>
                <Button onClick={() => setIsAddDialogOpen(false)}>Saqlash</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Jami mahsulotlar</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{inventory.length}</div>
              <p className="text-xs text-muted-foreground">Turli xil dorilar</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Jami qiymat</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{(totalValue / 1000000).toFixed(1)}M</div>
              <p className="text-xs text-muted-foreground">so'm</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Kam qolgan</CardTitle>
              <AlertTriangle className="h-4 w-4 text-destructive" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-destructive">{lowStockItems.length}</div>
              <p className="text-xs text-muted-foreground">Mahsulotlar</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Muddati tugaydi</CardTitle>
              <Calendar className="h-4 w-4 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-500">{expiringItems.length}</div>
              <p className="text-xs text-muted-foreground">3 oy ichida</p>
            </CardContent>
          </Card>
        </div>

        {/* Alerts */}
        {(lowStockItems.length > 0 || expiringItems.length > 0) && (
          <div className="space-y-3">
            {lowStockItems.length > 0 && (
              <Card className="border-destructive">
                <CardHeader>
                  <CardTitle className="text-sm flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-destructive" />
                    Kam qolgan mahsulotlar
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {lowStockItems.map((item) => (
                      <div key={item.id} className="flex items-center justify-between text-sm">
                        <span>{item.name}</span>
                        <Badge variant="destructive">
                          {item.quantity} / {item.minQuantity}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {expiringItems.length > 0 && (
              <Card className="border-orange-500">
                <CardHeader>
                  <CardTitle className="text-sm flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-orange-500" />
                    Muddati tugaydigan mahsulotlar
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {expiringItems.map((item) => (
                      <div key={item.id} className="flex items-center justify-between text-sm">
                        <span>{item.name}</span>
                        <Badge variant="secondary" className="bg-orange-100 text-orange-700">
                          {getDaysUntilExpiry(item.expiryDate)} kun
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {/* Search */}
        <Card>
          <CardHeader>
            <CardTitle>Inventar ro'yxati</CardTitle>
            <CardDescription>Barcha dori-darmonlar va ularning zaxirasi</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Dori yoki kategoriya bo'yicha qidirish..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Inventory Table */}
              <div className="border rounded-lg overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-muted">
                      <tr>
                        <th className="text-left p-3 text-sm font-medium">Dori nomi</th>
                        <th className="text-left p-3 text-sm font-medium">Kategoriya</th>
                        <th className="text-left p-3 text-sm font-medium">Miqdori</th>
                        <th className="text-left p-3 text-sm font-medium">Holat</th>
                        <th className="text-left p-3 text-sm font-medium">Narxi</th>
                        <th className="text-left p-3 text-sm font-medium">Amal qilish muddati</th>
                        <th className="text-left p-3 text-sm font-medium">Yetkazib beruvchi</th>
                        <th className="text-left p-3 text-sm font-medium">Amallar</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredInventory.map((item) => {
                        const status = getStockStatus(item)
                        const daysUntilExpiry = getDaysUntilExpiry(item.expiryDate)
                        const isExpiringSoon = daysUntilExpiry <= 90

                        return (
                          <tr key={item.id} className="border-t hover:bg-muted/50">
                            <td className="p-3">
                              <div className="font-medium">{item.name}</div>
                            </td>
                            <td className="p-3">
                              <Badge variant="outline">{item.category}</Badge>
                            </td>
                            <td className="p-3">
                              <div className="font-medium">{item.quantity}</div>
                              <div className="text-xs text-muted-foreground">Min: {item.minQuantity}</div>
                            </td>
                            <td className="p-3">
                              <Badge variant={status.variant}>{status.label}</Badge>
                            </td>
                            <td className="p-3">{item.price.toLocaleString()} so'm</td>
                            <td className="p-3">
                              <div className={isExpiringSoon ? "text-orange-600 font-medium" : ""}>
                                {new Date(item.expiryDate).toLocaleDateString("uz-UZ")}
                              </div>
                              {isExpiringSoon && (
                                <div className="text-xs text-orange-600">{daysUntilExpiry} kun qoldi</div>
                              )}
                            </td>
                            <td className="p-3 text-sm">{item.supplier}</td>
                            <td className="p-3">
                              <div className="flex gap-2">
                                <Button variant="ghost" size="sm">
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="sm">
                                  <Trash2 className="h-4 w-4 text-destructive" />
                                </Button>
                              </div>
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              </div>

              {filteredInventory.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  <Package className="h-12 w-12 mx-auto mb-2 opacity-50" />
                  <p>Hech qanday mahsulot topilmadi</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </PharmacyLayout>
  )
}
