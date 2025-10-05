import { LabLayout } from "@/components/lab/lab-layout"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function Loading() {
  return (
    <LabLayout>
      <div className="space-y-6">
        <div className="h-10 w-64 bg-muted animate-pulse rounded" />
        <div className="grid gap-4 md:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i}>
              <CardHeader>
                <div className="h-4 w-32 bg-muted animate-pulse rounded" />
              </CardHeader>
              <CardContent>
                <div className="h-8 w-16 bg-muted animate-pulse rounded" />
              </CardContent>
            </Card>
          ))}
        </div>
        <Card>
          <CardHeader>
            <div className="h-6 w-48 bg-muted animate-pulse rounded" />
          </CardHeader>
          <CardContent>
            <div className="h-96 bg-muted animate-pulse rounded" />
          </CardContent>
        </Card>
      </div>
    </LabLayout>
  )
}
