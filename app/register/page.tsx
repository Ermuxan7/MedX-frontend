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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
    phone: "",
    licenseNumber: "",
  });
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Parollar mos kelmadi");
      return;
    }

    if (!formData.role) {
      alert("Iltimos, rolni tanlang");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/register`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: formData.fullName,
            email: formData.email,
            password: formData.password,
            role: formData.role.toUpperCase(), // backendda Role enum
          }),
        }
      );

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Xatolik yuz berdi");
      }

      const data = await res.json();

      // 🔐 Tokenlarni localStorage'da saqlaymiz
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);
      localStorage.setItem("user", JSON.stringify(data.user));

      alert("Hisob muvaffaqiyatli yaratildi!");
      router.push("/dashboard");
    } catch (err: any) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-muted/20 p-4">
      <div className="w-full max-w-2xl space-y-6">
        {/* Logo */}
        <div className="text-center space-y-2">
          <Link href="/" className="inline-flex items-center gap-2">
            <div className="rounded-lg flex items-center justify-center">
              <Image src="/logo.svg" alt="logo" width={40} height={40} />
            </div>
          </Link>
          <h1 className="text-2xl font-bold">Hisob yaratish</h1>
          <p className="text-muted-foreground">MedX platformasiga qo'shiling</p>
        </div>

        {/* Registration Form */}
        <Card>
          <CardHeader>
            <CardTitle>Ro'yxatdan o'tish</CardTitle>
            <CardDescription>
              Hisob yaratish uchun ma'lumotlaringizni kiriting
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleRegister} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">To'liq ism</Label>
                  <Input
                    id="fullName"
                    placeholder="Ism Familiya"
                    value={formData.fullName}
                    onChange={(e) =>
                      setFormData({ ...formData, fullName: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="sizning@email.com"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    required
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Telefon raqam</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+998 90 123 45 67"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="role">Rol</Label>
                  <Select
                    value={formData.role}
                    onValueChange={(value) =>
                      setFormData({ ...formData, role: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Rolni tanlang" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="doctor">Shifokor</SelectItem>
                      <SelectItem value="patient">Bemor</SelectItem>
                      <SelectItem value="lab">Laboratoriya</SelectItem>
                      <SelectItem value="pharmacy">Dorixona</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {(formData.role === "doctor" ||
                formData.role === "lab" ||
                formData.role === "pharmacy") && (
                <div className="space-y-2">
                  <Label htmlFor="licenseNumber">
                    {formData.role === "doctor"
                      ? "Tibbiy litsenziya raqami"
                      : formData.role === "lab"
                      ? "Laboratoriya litsenziya raqami"
                      : "Dorixona litsenziya raqami"}
                  </Label>
                  <Input
                    id="licenseNumber"
                    placeholder="Litsenziya raqamini kiriting"
                    value={formData.licenseNumber}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        licenseNumber: e.target.value,
                      })
                    }
                    required
                  />
                </div>
              )}

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="password">Parol</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Parolni tasdiqlang</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        confirmPassword: e.target.value,
                      })
                    }
                    required
                  />
                </div>
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Hisob yaratilmoqda..." : "Hisob yaratish"}
              </Button>
            </form>

            <div className="mt-6 text-center text-sm">
              <span className="text-muted-foreground">Hisobingiz bormi? </span>
              <Link
                href="/login"
                className="text-primary hover:underline font-medium"
              >
                Kirish
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
