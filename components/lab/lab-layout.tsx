"use client";

import type React from "react";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Home, FlaskConical, BarChart3, LogOut, Menu } from "lucide-react";
import { useState } from "react";
import Image from "next/image";

const navigation = [
  { name: "Bosh sahifa", href: "/lab/dashboard", icon: Home },
  { name: "Testlar", href: "/lab/tests", icon: FlaskConical },
  { name: "Statistika", href: "/lab/statistics", icon: BarChart3 },
];

export function LabLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("userRole");
    router.push("/");
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 border-b md:border-r bg-background">
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b">
            <Link href="/lab/dashboard" className="flex items-center gap-2">
              <div className="rounded-lg flex items-center justify-center">
                <Image src="/logo.svg" alt="logo" width={36} height={36} />
              </div>
              <div>
                <p className="font-semibold">MedX</p>
                <p className="text-xs text-muted-foreground">
                  Laboratoriya Paneli
                </p>
              </div>
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden p-4 border-b">
            <Button
              variant="outline"
              className="w-full bg-transparent"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Menu className="h-4 w-4 mr-2" />
              Menyu
            </Button>
          </div>

          {/* Navigation */}
          <nav
            className={`flex-1 p-4 space-y-2 ${
              mobileMenuOpen ? "block" : "hidden md:block"
            }`}
          >
            {navigation.map((item) => {
              const isActive =
                pathname === item.href || pathname.startsWith(item.href + "/");
              return (
                <Link key={item.name} href={item.href}>
                  <Button
                    variant={isActive ? "secondary" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <item.icon className="h-4 w-4 mr-3" />
                    {item.name}
                  </Button>
                </Link>
              );
            })}
          </nav>

          {/* User Section */}
          <div
            className={`p-4 border-t ${
              mobileMenuOpen ? "block" : "hidden md:block"
            }`}
          >
            <div className="mb-3 p-3 bg-muted rounded-lg">
              <p className="font-medium text-sm">
                Markaziy tibbiy laboratoriya
              </p>
              <p className="text-xs text-muted-foreground">lab@example.com</p>
            </div>
            <Button
              variant="outline"
              className="w-full bg-transparent"
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4 mr-2" />
              Chiqish
            </Button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-8 bg-muted/20">{children}</main>
    </div>
  );
}
