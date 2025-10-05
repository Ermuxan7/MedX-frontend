"use client";

import type React from "react";

import { useState } from "react";
import Link from "next/link";
import { DoctorLayout } from "@/components/doctor/doctor-layout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus, MoreVertical, Eye, Edit, Trash2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Mock patient data
const initialPatients = [
  {
    id: 1,
    name: "Alisher Karimov",
    age: 45,
    phone: "+998 90 123 4567",
    lastVisit: "2025-01-15",
    hasResults: true,
  },
  {
    id: 2,
    name: "Dilnoza Rashidova",
    age: 32,
    phone: "+998 91 234 5678",
    lastVisit: "2025-01-14",
    hasResults: false,
  },
  {
    id: 3,
    name: "Bobur Tursunov",
    age: 28,
    phone: "+998 93 345 6789",
    lastVisit: "2025-01-13",
    hasResults: true,
  },
  {
    id: 4,
    name: "Malika Abdullayeva",
    age: 56,
    phone: "+998 94 456 7890",
    lastVisit: "2025-01-12",
    hasResults: true,
  },
  {
    id: 5,
    name: "Sardor Yusupov",
    age: 41,
    phone: "+998 95 567 8901",
    lastVisit: "2025-01-11",
    hasResults: false,
  },
];

export default function PatientsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [patientsList, setPatientsList] = useState(initialPatients);
  const [newPatient, setNewPatient] = useState({
    name: "",
    age: "",
    phone: "",
    address: "",
    allergies: "",
    medicalHistory: "",
  });

  const filteredPatients = patientsList.filter(
    (patient) =>
      patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.phone.includes(searchQuery) ||
      patient.id.toString().includes(searchQuery)
  );

  const handleAddPatient = (e: React.FormEvent) => {
    e.preventDefault();
    const patient = {
      id: patientsList.length + 1,
      name: newPatient.name,
      age: Number.parseInt(newPatient.age),
      phone: newPatient.phone,
      lastVisit: new Date().toISOString().split("T")[0],
      hasResults: false,
    };
    setPatientsList([patient, ...patientsList]);
    setNewPatient({
      name: "",
      age: "",
      phone: "",
      address: "",
      allergies: "",
      medicalHistory: "",
    });
    setOpen(false);
  };

  return (
    <DoctorLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Bemorlar</h1>
            <p className="text-muted-foreground">
              Bemorlarni qidirish va boshqarish
            </p>
          </div>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Yangi bemor qo'shish
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Yangi bemor qo'shish</DialogTitle>
                <DialogDescription>
                  Yangi bemorning ma'lumotlarini kiriting
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleAddPatient} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">F.I.O *</Label>
                    <Input
                      id="name"
                      placeholder="Alisher Karimov"
                      value={newPatient.name}
                      onChange={(e) =>
                        setNewPatient({ ...newPatient, name: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="age">Yosh *</Label>
                    <Input
                      id="age"
                      type="number"
                      placeholder="45"
                      value={newPatient.age}
                      onChange={(e) =>
                        setNewPatient({ ...newPatient, age: e.target.value })
                      }
                      required
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Telefon raqami *</Label>
                    <Input
                      id="phone"
                      placeholder="+998 90 123 4567"
                      value={newPatient.phone}
                      onChange={(e) =>
                        setNewPatient({ ...newPatient, phone: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address">Manzil</Label>
                    <Input
                      id="address"
                      placeholder="Toshkent shahar"
                      value={newPatient.address}
                      onChange={(e) =>
                        setNewPatient({
                          ...newPatient,
                          address: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="allergies">Allergiyalar</Label>
                  <Textarea
                    id="allergies"
                    placeholder="Penitsillin, yong'oq..."
                    value={newPatient.allergies}
                    onChange={(e) =>
                      setNewPatient({
                        ...newPatient,
                        allergies: e.target.value,
                      })
                    }
                    rows={2}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="medicalHistory">Tibbiy tarix</Label>
                  <Textarea
                    id="medicalHistory"
                    placeholder="Avvalgi kasalliklar, operatsiyalar..."
                    value={newPatient.medicalHistory}
                    onChange={(e) =>
                      setNewPatient({
                        ...newPatient,
                        medicalHistory: e.target.value,
                      })
                    }
                    rows={3}
                  />
                </div>
                <div className="flex justify-end gap-2 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setOpen(false)}
                  >
                    Bekor qilish
                  </Button>
                  <Button type="submit">Bemor qo'shish</Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Search and Filters */}
        <Card>
          <CardHeader>
            <CardTitle>Tezkor qidiruv</CardTitle>
            <CardDescription>
              Bemorlarni ism, ID yoki telefon raqami bo'yicha qidiring
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Bemorlarni qidirish..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
              {/* <Button>Qidirish</Button> */}
            </div>
          </CardContent>
        </Card>

        {/* Patients List */}
        <Card>
          <CardHeader>
            <CardTitle>Barcha bemorlar</CardTitle>
            {/* <CardDescription>Yaqinda ko'rgan bemorlaringiz</CardDescription> */}
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {filteredPatients.map((patient) => (
                <div
                  key={patient.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <Link
                    href={`/doctor/patients/${patient.id}`}
                    className="flex items-center gap-4 flex-1"
                  >
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-lg font-semibold text-primary">
                        {patient.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 flex-wrap text-sm flex-1">
                      <span className="font-medium">{patient.name}</span>
                      <span className="text-muted-foreground">
                        Oxirgi tashrif: {patient.lastVisit}
                      </span>
                      {patient.hasResults ? (
                        <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                          Natijalar tayyor
                        </span>
                      ) : (
                        <span className="text-xs px-2 py-1 rounded-full bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400">
                          Natijalar kutilmoqda
                        </span>
                      )}
                    </div>
                  </Link>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 flex-shrink-0"
                      >
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent align="end" className="z-50">
                      <DropdownMenuItem asChild>
                        <Link
                          href={`/doctor/patients/${patient.id}`}
                          className="flex items-center cursor-pointer"
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          Batafsil ko‘rish
                        </Link>
                      </DropdownMenuItem>

                      <DropdownMenuItem>
                        <Edit className="h-4 w-4 mr-2" />
                        Tahrirlash
                      </DropdownMenuItem>

                      <DropdownMenuItem className="text-destructive">
                        <Trash2 className="h-4 w-4 mr-2" />
                        O‘chirish
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DoctorLayout>
  );
}
