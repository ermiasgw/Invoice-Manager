"use client"
import Image from "next/image"
import Link from "next/link"
import {
  ChevronLeft,
  ChevronRight,
  Copy,
  CreditCard,
  File,
  Home,
  LineChart,
  ListFilter,
  MoreVertical,
  Package,
  Package2,
  PanelLeft,
  Search,
  Settings,
  ShoppingCart,
  Truck,
  Users2,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { usePathname, useSearchParams } from "next/navigation"
import useSWR from "swr"
import { useEffect, useState } from "react"
import { URLSearchParams } from "url"


export default function InvoiceList({ params }: {params: any}) {
  const id = params.id

  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data: invoice, error: invoiceError } = useSWR(`/api/invoice/${id}`, fetcher)

  const { data: user, error: userError } = useSWR(`/api/user`, fetcher)

  if (invoiceError || userError) {
    return <p>no data</p>
  }


  return (
    <main className="grid p-20 pt-10">
      <Card
        className="sm:col-span-2" 
      >
        <CardHeader className="pb-3">
          <CardTitle>Invoice Detail
            
          <span className="float-right"> 
            <Link href={`/dashboard/invoices/update/${id}`} className="mr-4" >Edit</Link>
            <Button variant={"secondary"}>Export</Button>
          </span> n
          
        </CardTitle>
          
          
        </CardHeader>
        <CardContent>
          <div className="grid p-10" >
            <div className="justify-self-start">
              <h3>name: <span>{user ? user.name : ""}</span></h3>
              <h3>email: <span>{user ? user.email : ""}</span></h3>
              <h3>Invoice Id: <span>{id}</span></h3>
              <h3>Date: <span>{invoice ? invoice.dueDate: ""}</span></h3>
            </div>
            <div className="justify-self-end">
                <h3>Client name: <span>kfdjlkj</span></h3>
                <h3>Client email: <span>kfdjlkj</span></h3>
                <h3>Invoice status: <span>kffffdjlkj</span></h3>
                <h3>Total: <span>{invoice ? invoice.total + " " + invoice.currency: ""}</span></h3>
            </div>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="hidden sm:table-cell">Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead className="hidden sm:table-cell">
                  Status
                </TableHead>
                <TableHead className="hidden md:table-cell">
                  Date
                </TableHead>
                <TableHead className="hidden md:table-cell">Price</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow className="bg-accent">
                <TableCell>
                  1
                </TableCell>
                <TableCell>
                  <div className="font-medium">Liam Johnson</div>
                  <div className="hidden text-sm text-muted-foreground md:inline">
                    liam@example.com
                  </div>
                </TableCell>
                <TableCell className="hidden sm:table-cell">
                  <Badge className="text-xs" variant="secondary">
                    Fulfilled
                  </Badge>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  2023-06-23
                </TableCell>
                <TableCell className="hidden md:table-cell">$250.00</TableCell>
                
              </TableRow>
              
            </TableBody>
          </Table>
        </CardContent>
        
      </Card>
           
    </main>
  )
}