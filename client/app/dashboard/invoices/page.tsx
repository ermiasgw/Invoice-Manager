'use client'
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
  Edit,
  Delete,
  Trash,
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
import useSWR from 'swr' 
import { deleteInvoice } from "@/app/actions/invoice"


export default function InvoiceList() {
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data, error } = useSWR('/api/invoice', fetcher)

  const { data: user, error: userError } = useSWR(`/api/user`, fetcher)

  const downloadFile = async () => {
    try {
      // Make a POST request to the API route to download the file
      const response = await fetch(`http://127.0.0.1:4000/export/pdf/all/${user.id}`, {
        method: 'GET',
      });

      // Trigger the download by creating a blob URL and clicking a link
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'invoices.zip');
      document.body.appendChild(link);
      link.click();

      // Clean up after download
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading file:', error);
    }
  };


  const downloadExcel = async () => {
    try {
      // Make a POST request to the API route to download the file
      const response = await fetch(`http://127.0.0.1:4000/export/excel/all/${user.id}`, {
        method: 'GET',
      });

      // Trigger the download by creating a blob URL and clicking a link
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'invoices.xlsx');
      document.body.appendChild(link);
      link.click();

      // Clean up after download
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading file:', error);
    }
  };

  if (error) {
    return (<p>no data</p>)
  }
  
  return (
  <main className="grid p-10">
    <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
      <div className="grid gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-6">
        <Card
          className="sm:col-span-2" x-chunk="dashboard-05-chunk-0"
        >
          <CardHeader className="pb-3">
            <CardTitle>Your Invoices</CardTitle>
            <CardDescription className="max-w-lg text-balance leading-relaxed">
              Invoices that list products and services that you provided along with the price
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <Link href={'/dashboard/invoices/create'}><Button>Create New Invoice</Button></Link>
          </CardFooter>
        </Card>
        
      </div>
      <Tabs defaultValue="week">
        <div className="flex items-center">
          <TabsList>
            <TabsTrigger value="week">Week</TabsTrigger>
            <TabsTrigger value="month">Month</TabsTrigger>
            <TabsTrigger value="year">Year</TabsTrigger>
          </TabsList>
          <div className="ml-auto flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-7 gap-1 text-sm"
                >
                  <ListFilter className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only">Filter</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem checked>
                  Fulfilled
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>
                  Declined
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>
                  Refunded
                </DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button
              size="sm"
              variant="outline"
              className="h-7 gap-1 text-sm"
              onClick={downloadFile}
            >
              <File className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only">Export Pdf</span>
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="h-7 gap-1 text-sm"
              onClick={downloadExcel}
            >
              <File className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only">Export Excel</span>
            </Button>
          </div>
        </div>
        <TabsContent value="week">
          <Card x-chunk="dashboard-05-chunk-3">
            <CardHeader className="px-7">
              <CardTitle>Invoices</CardTitle>
              <CardDescription>
                Recent invoices from you.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="hidden sm:table-cell">Id</TableHead>
                    <TableHead>Client</TableHead>
                    <TableHead className="hidden sm:table-cell">
                      Status
                    </TableHead>
                    <TableHead className="hidden md:table-cell">
                      Date
                    </TableHead>
                    <TableHead className="hidden md:table-cell">Total</TableHead>
                    <TableHead className="hidden md:table-cell"></TableHead>
                    <TableHead className="hidden md:table-cell"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data && data.map((value: any, index: any) => (
                    
                    <TableRow key={index} className="bg-accent">
                      <TableCell>
                      <Link href={`/dashboard/invoices/details/${value.id}`}>
                        {value.id}
                        </Link>
                      </TableCell>
                      <TableCell>
                      <Link href={`/dashboard/invoices/details/${value.id}`}>
                        <div className="font-medium">Liam Johnson</div>
                        <div className="hidden text-sm text-muted-foreground md:inline">
                          liam@example.com
                        </div>
                        </Link>
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">
                      <Link href={`/dashboard/invoices/details/${value.id}`}>
                        <Badge className="text-xs" variant="secondary">
                          Fulfilled
                        </Badge>
                        </Link>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                      <Link href={`/dashboard/invoices/details/${value.id}`}>
                        {value.dueDate}
                        </Link>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                      <Link href={`/dashboard/invoices/details/${value.id}`}>
                        {value.total + " " + value.currency}
                        </Link></TableCell>
                      <TableCell className="hidden md:table-cell">
                        <Link href={`/dashboard/invoices/update/${value.id}`}><Edit className="text-primary"/></Link>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        <Button onClick={async () => await deleteInvoice(value.id) } variant={"link"}>
                          <Trash className="text-destructive"/>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                  
                  
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  </main>
  )
}