"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const [showRoleModal, setShowRoleModal] = useState(false);
  const router = useRouter();

  const roles = [
    {
      id: "doctor",
      title: "Shifokor",
      description: "Bemorlarni ko'rish va retsept yozish",
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          />
        </svg>
      ),
      path: "/doctor/dashboard",
    },
    {
      id: "patient",
      title: "Bemor",
      description: "Tahlillar va retseptlarni ko'rish",
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
      ),
      path: "/patient/dashboard",
    },
    {
      id: "lab",
      title: "Laboratoriya",
      description: "Test natijalarini kiritish",
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
          />
        </svg>
      ),
      path: "/lab/dashboard",
    },
    {
      id: "pharmacy",
      title: "Dorixona",
      description: "Retseptlarni tekshirish va berish",
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
          />
        </svg>
      ),
      path: "/pharmacy/dashboard",
    },
  ];

  const handleRoleSelect = (role: string, path: string) => {
    localStorage.setItem("userRole", role);
    router.push(path);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b bg-background">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="rounded-lg flex items-center justify-center">
              <Image src="/logo.svg" alt="logo" width={36} height={36} />
            </div>
            <span className="text-xl font-semibold">MedX</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="outline">Kirish</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex items-center justify-center bg-gradient-to-b from-background to-muted/20">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-balance">
                Antibiotiklarga Sezgirlik Boshqaruv Platformasi
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground text-balance max-w-2xl mx-auto">
                Real vaqt rejimida sezgirlik test natijalari asosida antibiotik
                retseptlarini boshqaring. Shifokorlar, laboratoriyalar, bemorlar
                va dorixonalarni bir xavfsiz platformada birlashtiring.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                size="lg"
                className="w-full sm:w-auto"
                onClick={() => setShowRoleModal(true)}
              >
                Boshlash
              </Button>
              <Link href="/login">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto bg-transparent"
                >
                  Kirish
                </Button>
              </Link>
            </div>

            {/* Feature Cards */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
              <div className="p-6 rounded-lg border bg-card text-card-foreground text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mb-4 mx-auto">
                  <svg
                    className="w-8 h-8 text-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
                <h3 className="font-semibold mb-2">Shifokorlar uchun</h3>
                <p className="text-sm text-muted-foreground">
                  Bemorlarning sezgirlik natijalariga kirish va ishonch bilan
                  antibiotiklar retseptini yozing
                </p>
              </div>

              <div className="p-6 rounded-lg border bg-card text-card-foreground text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mb-4 mx-auto">
                  <svg
                    className="w-8 h-8 text-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                    />
                  </svg>
                </div>
                <h3 className="font-semibold mb-2">Laboratoriyalar uchun</h3>
                <p className="text-sm text-muted-foreground">
                  Antibiotiklarga sezgirlik test natijalarini darhol kiriting va
                  ulashing
                </p>
              </div>

              <div className="p-6 rounded-lg border bg-card text-card-foreground text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mb-4 mx-auto">
                  <svg
                    className="w-8 h-8 text-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                </div>
                <h3 className="font-semibold mb-2">Bemorlar uchun</h3>
                <p className="text-sm text-muted-foreground">
                  Laboratoriya natijalaringizni ko'ring va retseptlarni xavfsiz
                  qabul qiling
                </p>
              </div>

              <div className="p-6 rounded-lg border bg-card text-card-foreground text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mb-4 mx-auto">
                  <svg
                    className="w-8 h-8 text-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                </div>
                <h3 className="font-semibold mb-2">Dorixonalar uchun</h3>
                <p className="text-sm text-muted-foreground">
                  QR kod orqali retseptlarni tekshiring va dori-darmonlarni
                  xavfsiz bering
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t py-6 bg-background">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>&copy; 2025 MedX. Barcha huquqlar himoyalangan.</p>
        </div>
      </footer>

      <Dialog open={showRoleModal} onOpenChange={setShowRoleModal}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl">Rolni tanlang</DialogTitle>
            <DialogDescription>
              Qaysi sifatda tizimga kirishni xohlaysiz?
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
            {roles.map((role) => (
              <button
                key={role.id}
                onClick={() => handleRoleSelect(role.id, role.path)}
                className="p-6 rounded-lg border-2 border-border hover:border-primary hover:bg-primary/5 transition-all text-left group"
              >
                <div className="w-14 h-14 bg-primary/10 group-hover:bg-primary/20 rounded-lg flex items-center justify-center mb-4 text-primary transition-colors">
                  {role.icon}
                </div>
                <h3 className="font-semibold text-lg mb-2">{role.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {role.description}
                </p>
              </button>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
