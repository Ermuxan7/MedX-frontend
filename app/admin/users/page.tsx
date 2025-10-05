"use client"

import { useState } from "react"
import { AdminLayout } from "@/components/admin/admin-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, UserPlus, MoreVertical } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

// Mock users data
const doctors = [
  { id: 1, name: "Dr. Smith", email: "smith@example.com", license: "MD-12345", status: "active", patients: 248 },
  { id: 2, name: "Dr. Johnson", email: "johnson@example.com", license: "MD-12346", status: "active", patients: 189 },
  { id: 3, name: "Dr. Williams", email: "williams@example.com", license: "MD-12347", status: "inactive", patients: 0 },
]

const labs = [
  { id: 1, name: "Central Medical Lab", email: "central@lab.com", license: "LAB-001", status: "active", tests: 1245 },
  { id: 2, name: "City Diagnostic Center", email: "city@lab.com", license: "LAB-002", status: "active", tests: 892 },
  { id: 3, name: "Regional Lab", email: "regional@lab.com", license: "LAB-003", status: "active", tests: 654 },
]

const pharmacies = [
  {
    id: 1,
    name: "City Pharmacy",
    email: "city@pharmacy.com",
    license: "PH-001",
    status: "active",
    prescriptions: 486,
  },
  {
    id: 2,
    name: "Health Plus Pharmacy",
    email: "healthplus@pharmacy.com",
    license: "PH-002",
    status: "active",
    prescriptions: 392,
  },
]

export default function UsersPage() {
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">User Management</h1>
            <p className="text-muted-foreground">Manage all users in the system</p>
          </div>
          <Button>
            <UserPlus className="h-4 w-4 mr-2" />
            Add User
          </Button>
        </div>

        {/* Search */}
        <Card>
          <CardContent className="pt-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search users by name, email, or license..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs defaultValue="doctors" className="space-y-4">
          <TabsList>
            <TabsTrigger value="doctors">Doctors ({doctors.length})</TabsTrigger>
            <TabsTrigger value="labs">Labs ({labs.length})</TabsTrigger>
            <TabsTrigger value="pharmacies">Pharmacies ({pharmacies.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="doctors" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Doctors</CardTitle>
                <CardDescription>Manage doctor accounts</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {doctors.map((doctor) => (
                    <div key={doctor.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                          <span className="text-lg font-semibold text-primary">
                            {doctor.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium">{doctor.name}</p>
                          <p className="text-sm text-muted-foreground">{doctor.email}</p>
                          <p className="text-xs text-muted-foreground">License: {doctor.license}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="text-sm font-medium">{doctor.patients} patients</p>
                          <Badge variant={doctor.status === "active" ? "default" : "secondary"}>{doctor.status}</Badge>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>View Details</DropdownMenuItem>
                            <DropdownMenuItem>Edit User</DropdownMenuItem>
                            <DropdownMenuItem>
                              {doctor.status === "active" ? "Deactivate" : "Activate"}
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">Delete User</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="labs" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Laboratories</CardTitle>
                <CardDescription>Manage laboratory accounts</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {labs.map((lab) => (
                    <div key={lab.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                          <span className="text-lg font-semibold text-primary">
                            {lab.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")
                              .slice(0, 2)}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium">{lab.name}</p>
                          <p className="text-sm text-muted-foreground">{lab.email}</p>
                          <p className="text-xs text-muted-foreground">License: {lab.license}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="text-sm font-medium">{lab.tests} tests</p>
                          <Badge variant={lab.status === "active" ? "default" : "secondary"}>{lab.status}</Badge>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>View Details</DropdownMenuItem>
                            <DropdownMenuItem>Edit User</DropdownMenuItem>
                            <DropdownMenuItem>{lab.status === "active" ? "Deactivate" : "Activate"}</DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">Delete User</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="pharmacies" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Pharmacies</CardTitle>
                <CardDescription>Manage pharmacy accounts</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {pharmacies.map((pharmacy) => (
                    <div key={pharmacy.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                          <span className="text-lg font-semibold text-primary">
                            {pharmacy.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")
                              .slice(0, 2)}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium">{pharmacy.name}</p>
                          <p className="text-sm text-muted-foreground">{pharmacy.email}</p>
                          <p className="text-xs text-muted-foreground">License: {pharmacy.license}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="text-sm font-medium">{pharmacy.prescriptions} prescriptions</p>
                          <Badge variant={pharmacy.status === "active" ? "default" : "secondary"}>
                            {pharmacy.status}
                          </Badge>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>View Details</DropdownMenuItem>
                            <DropdownMenuItem>Edit User</DropdownMenuItem>
                            <DropdownMenuItem>
                              {pharmacy.status === "active" ? "Deactivate" : "Activate"}
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">Delete User</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  )
}
