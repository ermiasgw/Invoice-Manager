
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Link from "next/link"


export default function Dashboard() {
  return (
    <Card className="mx-auto max-w-sm mt-10">
      <CardHeader>
        <CardTitle className="text-l">Dashboard Home</CardTitle>
        <CardDescription>
          <Link color="blue" className="text-xl" href="/dashboard/invoices">Invoices</Link>
        </CardDescription>

      </CardHeader>
      <CardContent>
        
      </CardContent>
    </Card>
  )
}