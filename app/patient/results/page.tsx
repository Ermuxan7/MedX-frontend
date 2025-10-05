"use client"

import Link from "next/link"
import { PatientLayout } from "@/components/patient/patient-layout"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FlaskConical, MoreVertical, Eye, Download, Share2 } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const labResults = [
  {
    id: 1,
    date: "2025-01-15",
    lab: "Markaziy tibbiy laboratoriya",
    type: "Antibiotiklarga sezgirlik testi",
    status: "completed",
    bacteria: "Staphylococcus aureus",
    hasDetails: true,
  },
  {
    id: 2,
    date: "2025-01-10",
    lab: "Shahar diagnostika markazi",
    type: "Qon tahlili",
    status: "completed",
    hasDetails: false,
  },
  {
    id: 3,
    date: "2024-12-20",
    lab: "Markaziy tibbiy laboratoriya",
    type: "Antibiotiklarga sezgirlik testi",
    status: "completed",
    bacteria: "Escherichia coli",
    hasDetails: true,
  },
  {
    id: 4,
    date: "2024-12-15",
    lab: "Viloyat laboratoriyasi",
    type: "Siydik ekini",
    status: "completed",
    hasDetails: false,
  },
]

export default function ResultsPage() {
  return (
    <PatientLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Tahlil natijalari</h1>
          <p className="text-muted-foreground">Barcha test natijalari va hisobotlaringizni ko'ring</p>
        </div>

        <div className="space-y-3">
          {labResults.map((result) => (
            <Card key={result.id}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4 flex-1 min-w-0">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <FlaskConical className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex items-center gap-2 text-sm flex-1 min-w-0">
                      <span className="font-medium truncate">{result.type}</span>
                      <span className="text-muted-foreground flex-shrink-0">•</span>
                      <span className="text-muted-foreground truncate">{result.lab}</span>
                      {result.bacteria && (
                        <>
                          <span className="text-muted-foreground flex-shrink-0">•</span>
                          <span className="text-muted-foreground truncate">{result.bacteria}</span>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <div className="flex items-center gap-2 text-sm">
                      <span className="text-muted-foreground">Sana:</span>
                      <span className="font-medium">{result.date}</span>
                    </div>
                    <Badge variant="secondary">Tayyor</Badge>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        {result.hasDetails && (
                          <DropdownMenuItem asChild>
                            <Link href={`/patient/results/${result.id}`} className="flex items-center cursor-pointer">
                              <Eye className="h-4 w-4 mr-2" />
                              Batafsil ko'rish
                            </Link>
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuItem>
                          <Download className="h-4 w-4 mr-2" />
                          Yuklab olish
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Share2 className="h-4 w-4 mr-2" />
                          Ulashish
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </PatientLayout>
  )
}
