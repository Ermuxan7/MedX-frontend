"use client";

import { useState } from "react";
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
import { Search, Users, FileText, TrendingUp, Clock } from "lucide-react";
import Link from "next/link";

// Mock data
const recentPatients = [
  {
    id: 1,
    name: "Alisher Karimov",
    lastVisit: "2025-01-15",
    status: "Natijalar tayyor",
  },
  {
    id: 2,
    name: "Dilnoza Rashidova",
    lastVisit: "2025-01-14",
    status: "Natijalar kutilmoqda",
  },
  {
    id: 3,
    name: "Bobur Tursunov",
    lastVisit: "2025-01-13",
    status: "Natijalar tayyor",
  },
];

const stats = [
  { label: "Jami bemorlar", value: "248", icon: Users, trend: "+12%" },
  { label: "Bugungi retseptlar", value: "15", icon: FileText, trend: "+5%" },
  { label: "Kutilayotgan natijalar", value: "8", icon: Clock, trend: "-3%" },
  {
    label: "Muvaffaqiyat darajasi",
    value: "94%",
    icon: TrendingUp,
    trend: "+2%",
  },
];

export default function DoctorDashboard() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <DoctorLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Bosh sahifa</h1>
          <p className="text-muted-foreground">Xush kelibsiz, Dr. Smith</p>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <Card key={stat.label}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.label}
                </CardTitle>
                <stat.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">
                  <span
                    className={
                      stat.trend.startsWith("+")
                        ? "text-green-600"
                        : "text-red-600"
                    }
                  >
                    {stat.trend}
                  </span>{" "}
                  o'tgan oyga nisbatan
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Search */}
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
              <Button>Qidirish</Button>
            </div>
          </CardContent>
        </Card>

        {/* Recent Patients */}
        <Card>
          <CardHeader>
            <CardTitle>So'nggi bemorlar</CardTitle>
            <CardDescription>Yaqinda ko'rgan bemorlaringiz</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentPatients.map((patient) => (
                <div
                  key={patient.id}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div className="space-y-1">
                    <p className="font-medium">{patient.name}</p>
                    <p className="text-sm text-muted-foreground">
                      Oxirgi tashrif: {patient.lastVisit}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span
                      className={`text-sm px-3 py-1 rounded-full ${
                        patient.status === "Natijalar tayyor"
                          ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                          : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                      }`}
                    >
                      {patient.status}
                    </span>
                    <Link href={`/doctor/patients/${patient.id}`}>
                      <Button variant="outline" size="sm">
                        Batafsil
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DoctorLayout>
  );
}
