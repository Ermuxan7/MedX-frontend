"use client";

import type React from "react";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      let userRole = "patient"; // default role

      // First, check if user exists in registered users
      const existingUsers = JSON.parse(
        localStorage.getItem("medx_users") || "[]"
      );
      const foundUser = existingUsers.find((user: any) => user.email === email);

      if (foundUser) {
        // Use the role from registration
        userRole = foundUser.role;
        // Store current user session
        localStorage.setItem("medx_current_user", JSON.stringify(foundUser));
      } else {
        // For demo accounts, determine role from email
        if (email.includes("doctor")) {
          userRole = "doctor";
        } else if (email.includes("lab")) {
          userRole = "lab";
        } else if (email.includes("pharmacy")) {
          userRole = "pharmacy";
        } else if (email.includes("admin")) {
          userRole = "admin";
        }

        // Store demo user session
        localStorage.setItem(
          "medx_current_user",
          JSON.stringify({ email, role: userRole })
        );
      }

      // Route based on role
      switch (userRole) {
        case "doctor":
          router.push("/doctor/dashboard");
          break;
        case "lab":
          router.push("/lab/dashboard");
          break;
        case "pharmacy":
          router.push("/pharmacy/dashboard");
          break;
        case "admin":
          router.push("/admin/dashboard");
          break;
        case "patient":
        default:
          router.push("/patient/dashboard");
          break;
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-muted/20 p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Logo */}
        <div className="text-center space-y-2">
          <Link href="/" className="inline-flex items-center gap-2">
            <div className="rounded-lg flex items-center justify-center">
              <Image src="/logo.svg" alt="logo" width={36} height={36} />
            </div>
          </Link>
          <h1 className="text-2xl font-bold">Xush kelibsiz</h1>
          <p className="text-muted-foreground">Hisobingizga kiring</p>
        </div>

        {/* Login Form */}
        <Card>
          <CardHeader>
            <CardTitle>Kirish</CardTitle>
            <CardDescription>
              Hisobingizga kirish uchun ma'lumotlaringizni kiriting
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="sizning@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Parol</Label>
                  <Link
                    href="/forgot-password"
                    className="text-sm text-primary hover:underline"
                  >
                    Parolni unutdingizmi?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Kirilmoqda..." : "Kirish"}
              </Button>
            </form>

            <div className="mt-6 text-center text-sm">
              <span className="text-muted-foreground">Hisobingiz yo'qmi? </span>
              <Link
                href="/register"
                className="text-primary hover:underline font-medium"
              >
                Ro'yxatdan o'tish
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Demo Credentials */}
        <Card className="bg-muted/50">
          <CardContent className="pt-6">
            <p className="text-sm font-medium mb-2">Demo ma'lumotlar:</p>
            <div className="text-xs space-y-1 text-muted-foreground">
              <p>Shifokor: doctor@example.com</p>
              <p>Bemor: patient@example.com</p>
              <p>Laboratoriya: lab@example.com</p>
              <p>Dorixona: pharmacy@example.com</p>
              <p>Admin: admin@example.com</p>
              <p className="pt-1">Parol: istalgan parol</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
